import React from 'react';

const examples = [
  {
    before: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=1887&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop',
    prompt: 'A cozy, modern living room with a fireplace and plenty of natural light.',
    name: 'Modern Living Room',
  },
  {
    before: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=2070&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2070&auto=format&fit=crop',
    prompt: 'Scandinavian bedroom with minimalist furniture and a neutral color palette.',
    name: 'Scandinavian Bedroom',
  },
  {
    before: 'https://images.unsplash.com/photo-1567016432779-934571936c1b?q=80&w=1887&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1615875605825-5eb9bb5e4244?q=80&w=1887&auto=format&fit=crop',
    prompt: 'Industrial-style kitchen with exposed brick and stainless steel appliances.',
    name: 'Industrial Kitchen',
  },
];

export const ExamplesSection: React.FC = () => {
  return (
    <section 
        className="py-20"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Transform Any Room
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          From cluttered and dated to clean and modern. See how our AI can breathe new life into your space.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
              <div className="relative">
                <img src={example.after} alt={example.name} className="w-full h-64 object-cover" />
                 <div className="absolute top-2 left-2 bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded">AFTER</div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{example.name}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">"{example.prompt}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};