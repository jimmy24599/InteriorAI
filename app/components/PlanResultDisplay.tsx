import React, { useMemo } from 'react';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

interface Feature {
  name: string;
  position: string;
  size?: string;
  type?: string;
  additionalInfo?: string;
}

interface Door {
  location: string;
  destination: string;
  type?: string;
  swing?: string;
}

interface Window {
  location: string;
  type?: string;
  size?: string;
  additionalInfo?: string;
}

interface Fixture {
  name: string;
  location: string;
  type?: string;
  additionalInfo?: string;
}

interface Storage {
  type: string;
  location: string;
  size?: string;
}

interface Room {
  name: string;
  roomType?: string;
  dimensions: string;
  area?: string;
  features: Feature[];
  doors?: Door[];
  windows?: Window[];
  fixtures?: Fixture[];
  storage?: Storage[];
  notes?: string;
}

interface PlanData {
  rooms: Room[];
}

interface PlanResultDisplayProps {
  planJson: string | null;
  isLoading: boolean;
}

export const PlanResultDisplay: React.FC<PlanResultDisplayProps> = ({ planJson, isLoading }) => {
  const { data, error } = useMemo<{ data: PlanData | null; error: string | null }>(() => {
    if (!planJson) {
      return { data: null, error: null };
    }
    try {
      const cleanJsonString = planJson.trim().replace(/^```json/, '').replace(/```$/, '').trim();
      const parsed = JSON.parse(cleanJsonString);
      if (parsed && Array.isArray(parsed.rooms)) {
        return { data: parsed, error: null };
      }
      return { data: null, error: "Invalid data structure received from AI." };
    } catch (e) {
      console.error("Failed to parse plan JSON:", e);
      return { data: null, error: 'Failed to understand the AI response. It was not valid JSON.' };
    }
  }, [planJson]);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <Loader />
        <p className="mt-4 text-gray-600 font-semibold">Analyzing your floor plan...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!data || data.rooms.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">Detailed Floor Plan Analysis</h2>
      <div className="space-y-8">
        {data.rooms.map((room) => (
          <div key={room.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-amber-600">{room.name}</h3>
                {room.roomType && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                    {room.roomType}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Dimensions:</span> {room.dimensions}
                </p>
                {room.area && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Area:</span> {room.area}
                  </p>
                )}
              </div>

              {/* Doors Section */}
              {room.doors && room.doors.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-base font-medium text-gray-800 mb-2">🚪 Doors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {room.doors.map((door, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="font-semibold text-gray-700">{door.location}</div>
                        <div className="text-gray-600">→ {door.destination}</div>
                        {door.type && <div className="text-gray-500 text-xs">{door.type}</div>}
                        {door.swing && <div className="text-gray-500 text-xs">{door.swing}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Windows Section */}
              {room.windows && room.windows.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-base font-medium text-gray-800 mb-2">🪟 Windows</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {room.windows.map((window, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="font-semibold text-gray-700">{window.location}</div>
                        {window.type && <div className="text-gray-600">{window.type}</div>}
                        {window.size && <div className="text-gray-500 text-xs">{window.size}</div>}
                        {window.additionalInfo && <div className="text-gray-500 text-xs">{window.additionalInfo}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fixtures Section */}
              {room.fixtures && room.fixtures.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-base font-medium text-gray-800 mb-2">🔧 Fixtures & Appliances</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {room.fixtures.map((fixture, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="font-semibold text-gray-700">{fixture.name}</div>
                        <div className="text-gray-600">{fixture.location}</div>
                        {fixture.type && <div className="text-gray-500 text-xs">{fixture.type}</div>}
                        {fixture.additionalInfo && <div className="text-gray-500 text-xs">{fixture.additionalInfo}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Section */}
              {room.storage && room.storage.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-base font-medium text-gray-800 mb-2">📦 Storage Areas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {room.storage.map((storage, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="font-semibold text-gray-700">{storage.type}</div>
                        <div className="text-gray-600">{storage.location}</div>
                        {storage.size && <div className="text-gray-500 text-xs">{storage.size}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Features Section */}
              {room.features && room.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-base font-medium text-gray-800 mb-2">✨ Additional Features</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {room.features.map((feature, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="font-semibold text-gray-700">{feature.name}</div>
                        <div className="text-gray-600">{feature.position}</div>
                        {feature.size && <div className="text-gray-500 text-xs">Size: {feature.size}</div>}
                        {feature.type && <div className="text-gray-500 text-xs">Type: {feature.type}</div>}
                        {feature.additionalInfo && <div className="text-gray-500 text-xs">{feature.additionalInfo}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              {room.notes && (
                <div className="mt-4">
                  <h4 className="text-base font-medium text-gray-800 mb-2">📝 Notes</h4>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-sm text-blue-800">{room.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};