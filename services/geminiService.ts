import { GoogleGenAI, Modality, Type } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

// Fix: Initialize the GoogleGenAI client according to guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

/**
 * Redesigns an image based on a user's prompt.
 * Uses gemini-2.5-flash-image-preview for image editing.
 * @param imageFile The original image file.
 * @param prompt The user's description of the desired changes.
 * @returns A base64 encoded string of the generated image.
 */
export const redesignImage = async (imageFile: File, prompt: string): Promise<string | null> => {
  // Fix: Convert file to base64 for the API request.
  const base64ImageData = await fileToBase64(imageFile);

  // Fix: Use generateContent with the image editing model.
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: imageFile.type,
          },
        },
        {
          text: `Redesign this room with the following style: ${prompt}`,
        },
      ],
    },
    config: {
      // Fix: responseModalities must include both IMAGE and TEXT for this model.
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  // Fix: Extract the generated image data from the response.
  // The model can return both text and image, so we loop to find the image part.
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  return null;
};

// Fix: Add missing generateVideo function to resolve import error.
/**
 * Generates a video based on a text prompt and an optional image.
 * Uses veo-2.0-generate-001.
 * @param prompt The text prompt for video generation.
 * @param imageFile An optional initial image.
 * @param aspectRatio The desired aspect ratio of the video.
 * @param setProgressMessage A callback to update the UI with progress.
 * @returns A URL for the generated video, or null if it fails.
 */
export const generateVideo = async (
  prompt: string,
  imageFile: File | null,
  aspectRatio: string,
  setProgressMessage: (message: string) => void
): Promise<string | null> => {
  setProgressMessage('Preparing assets for video generation...');

  const generateVideosParams: any = {
    model: 'veo-2.0-generate-001',
    prompt: `${prompt} (aspect ratio: ${aspectRatio})`,
    config: {
      numberOfVideos: 1,
    },
  };

  if (imageFile) {
    setProgressMessage('Encoding image for video generation...');
    const base64ImageData = await fileToBase64(imageFile);
    generateVideosParams.image = {
      imageBytes: base64ImageData,
      mimeType: imageFile.type,
    };
  }

  setProgressMessage('Sending request to video generation model...');
  let operation = await ai.models.generateVideos(generateVideosParams);
  
  setProgressMessage('Video generation in progress... This may take a few minutes.');
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    setProgressMessage('Checking video status...');
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadLink) {
    throw new Error('Video generation succeeded but no download link was found.');
  }

  setProgressMessage('Video generated! Downloading video data...');
  // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
  const response = await fetch(`${downloadLink}&key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }

  const videoBlob = await response.blob();
  const videoUrl = URL.createObjectURL(videoBlob);
  
  setProgressMessage('Video ready!');
  return videoUrl;
};

/**
 * Analyzes a home floor plan image and extracts detailed information as JSON.
 * Uses gemini-2.5-flash.
 * @param imageFile The floor plan image.
 * @returns A JSON string with the detailed analysis.
 */
export const analyzeHomePlan = async (imageFile: File): Promise<string | null> => {
  const base64ImageData = await fileToBase64(imageFile);

  const schema = {
    type: Type.OBJECT,
    properties: {
      rooms: {
        type: Type.ARRAY,
        description: "List of all rooms and distinct spaces identified in the floor plan.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: 'The name of the space (e.g., "Living Room", "Master Bedroom", "Master Bathroom").',
            },
            roomType: {
              type: Type.STRING,
              description: 'The type of room (e.g., "Bedroom", "Bathroom", "Kitchen", "Living Room", "Garage", "Utility Room", "Closet", "Hallway").',
            },
            dimensions: {
              type: Type.STRING,
              description: 'The exact dimensions of the room as written on the plan (e.g., "12ft x 15ft", "8\'6\" x 10\'3\"").',
            },
            area: {
              type: Type.STRING,
              description: 'The calculated area of the room in square feet (e.g., "180 sq ft", "120 sq ft").',
            },
            features: {
              type: Type.ARRAY,
              description: "A comprehensive list of all features within this space, including their precise locations and specifications.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { 
                    type: Type.STRING, 
                    description: "The name of the feature (e.g., 'Window', 'Door', 'Sink', 'Shower', 'Toilet', 'Sofa', 'Bed', 'Closet')." 
                  },
                  position: { 
                    type: Type.STRING, 
                    description: "The precise location of the feature (e.g., 'Centered on the north wall', 'In the southeast corner', 'Left of the main entrance', 'Against the west wall')." 
                  },
                  size: {
                    type: Type.STRING,
                    description: "The size or dimensions of the feature if visible (e.g., '3ft wide', 'Standard size', 'Double door', 'Bay window')."
                  },
                  type: {
                    type: Type.STRING,
                    description: "The type or style of the feature (e.g., 'Sliding door', 'French door', 'Single hung window', 'Walk-in shower', 'Freestanding tub')."
                  },
                  additionalInfo: {
                    type: Type.STRING,
                    description: "Any additional relevant information about the feature (e.g., 'Opens to exterior', 'Connects to hallway', 'Has built-in storage', 'Includes medicine cabinet')."
                  }
                },
                required: ['name', 'position']
              },
            },
            doors: {
              type: Type.ARRAY,
              description: "Detailed information about all doors in this room.",
              items: {
                type: Type.OBJECT,
                properties: {
                  location: { type: Type.STRING, description: "Where the door is located (e.g., 'North wall', 'East wall')" },
                  destination: { type: Type.STRING, description: "Where the door leads to (e.g., 'Hallway', 'Master Bedroom', 'Exterior')" },
                  type: { type: Type.STRING, description: "Type of door (e.g., 'Single door', 'Double door', 'Sliding door', 'Pocket door')" },
                  swing: { type: Type.STRING, description: "Door swing direction if visible (e.g., 'Swing in', 'Swing out', 'Left swing', 'Right swing')" }
                },
                required: ['location', 'destination']
              }
            },
            windows: {
              type: Type.ARRAY,
              description: "Detailed information about all windows in this room.",
              items: {
                type: Type.OBJECT,
                properties: {
                  location: { type: Type.STRING, description: "Where the window is located (e.g., 'North wall', 'South wall')" },
                  type: { type: Type.STRING, description: "Type of window (e.g., 'Single hung', 'Double hung', 'Bay window', 'Picture window')" },
                  size: { type: Type.STRING, description: "Size of the window if visible (e.g., '3ft wide', 'Large window', 'Small window')" },
                  additionalInfo: { type: Type.STRING, description: "Additional window details (e.g., 'Corner window', 'Window seat', 'Skylight')" }
                },
                required: ['location']
              }
            },
            fixtures: {
              type: Type.ARRAY,
              description: "Detailed information about all fixtures and built-in elements.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the fixture (e.g., 'Sink', 'Toilet', 'Shower', 'Bathtub', 'Kitchen Island')" },
                  location: { type: Type.STRING, description: "Precise location of the fixture" },
                  type: { type: Type.STRING, description: "Type or style of fixture (e.g., 'Pedestal sink', 'Walk-in shower', 'Freestanding tub', 'Built-in oven')" },
                  additionalInfo: { type: Type.STRING, description: "Additional fixture details (e.g., 'Double vanity', 'Corner shower', 'Garden tub')" }
                },
                required: ['name', 'location']
              }
            },
            storage: {
              type: Type.ARRAY,
              description: "Information about storage areas and closets.",
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: "Type of storage (e.g., 'Walk-in closet', 'Built-in shelving', 'Pantry', 'Coat closet')" },
                  location: { type: Type.STRING, description: "Location of the storage area" },
                  size: { type: Type.STRING, description: "Size of the storage area if visible" }
                },
                required: ['type', 'location']
              }
            },
            notes: {
              type: Type.STRING,
              description: "Any additional notes or observations about this room (e.g., 'Open concept', 'Has vaulted ceiling', 'Corner room', 'Accessible design features')."
            }
          },
          required: ['name', 'roomType', 'dimensions', 'features'],
        },
      },
    },
    required: ['rooms'],
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        { inlineData: { data: base64ImageData, mimeType: imageFile.type } },
        { text: "Analyze the provided floor plan image." },
      ],
    },
    config: {
      systemInstruction: `You are an expert architectural plan analyst. Your task is to meticulously analyze the user's floor plan image with comprehensive detail.

      ANALYSIS REQUIREMENTS:
      1. Identify every distinct room and space (e.g., Living Room, Master Bedroom, Master Bathroom, Kitchen, Garage, Utility Room, Closet, Hallway).
      2. For each space, extract its exact dimensions as written on the plan and calculate the area.
      3. Categorize each room by type (Bedroom, Bathroom, Kitchen, Living Room, Garage, Utility Room, Closet, Hallway).
      
      DETAILED FEATURE ANALYSIS:
      4. For each room, identify and categorize ALL features:
         - DOORS: Location, destination, type (single/double/sliding/pocket), swing direction
         - WINDOWS: Location, type (single hung/double hung/bay/picture), size, special features
         - FIXTURES: For bathrooms - exact positions of sinks, toilets, showers, bathtubs, vanities
         - FIXTURES: For kitchens - exact positions of appliances, islands, sinks, cabinets
         - FIXTURES: For bedrooms - exact positions of beds, dressers, closets
         - STORAGE: All closets, pantries, built-in shelving with locations and sizes
         - FURNITURE: Sofas, tables, chairs with precise positioning
      
      POSITIONING SPECIFICITY:
      5. For every feature, provide PRECISE positioning:
         - Use cardinal directions (north, south, east, west walls)
         - Specify exact locations (centered, corner, left/right side)
         - Include relationships to other features (next to, opposite, adjacent)
         - Note any special arrangements (L-shaped, U-shaped, island placement)
      
      ROOM-SPECIFIC DETAILS:
      6. For BATHROOMS: Identify exact positions of all fixtures (sink, toilet, shower, bathtub, vanity, medicine cabinet, linen closet)
      7. For KITCHENS: Identify exact positions of all appliances (refrigerator, stove, dishwasher, microwave), islands, sinks, cabinets
      8. For BEDROOMS: Identify exact positions of beds, dressers, nightstands, closets, windows
      9. For GARAGES: Identify exact positions of vehicles, storage areas, workbenches, doors
      10. For UTILITY ROOMS: Identify exact positions of washer, dryer, water heater, electrical panels
      
      ADDITIONAL INFORMATION:
      11. Note any special architectural features (vaulted ceilings, open concepts, corner rooms)
      12. Identify accessibility features if present
      13. Note any unusual or custom elements
      
      Return your complete analysis as a single JSON object that strictly adheres to the provided schema. Include ALL available information - do not omit any details.`,
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  return response.text;
};