"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Stethoscope, Baby, BookOpen, Heart, Activity, ClipboardList, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ProtocolList from "@/components/ProtocolList";

const categories = [
  { id: "adult", label: "Adult", icon: Stethoscope, color: "bg-blue-500 hover:bg-blue-600" },
  { id: "pediatric", label: "Pediatric", icon: Baby, color: "bg-purple-500 hover:bg-purple-600" },
  { id: "reference", label: "Reference", icon: BookOpen, color: "bg-emerald-500 hover:bg-emerald-600" },
];

const subcategories = {
  adult: [
    { id: "cardiac", label: "Cardiac", icon: Heart, color: "bg-red-500 hover:bg-red-600" },
    { id: "general", label: "General", icon: Activity, color: "bg-sky-500 hover:bg-sky-600" },
  ],
  pediatric: [
    { id: "cardiac", label: "Cardiac", icon: Heart, color: "bg-red-500 hover:bg-red-600" },
    { id: "general", label: "General", icon: Activity, color: "bg-sky-500 hover:bg-sky-600" },
  ],
  reference: [
    { id: "medications", label: "Medications", icon: ClipboardList, color: "bg-amber-500 hover:bg-amber-600" },
    { id: "operations", label: "Operations", icon: Activity, color: "bg-indigo-500 hover:bg-indigo-600" },
  ],
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const getActiveCategoryLabel = () => {
    const category = categories.find(c => c.id === selectedCategory);
    const subcategory = selectedCategory && selectedSubcategory ? 
      subcategories[selectedCategory as keyof typeof subcategories].find(s => s.id === selectedSubcategory) : null;
    
    if (category && subcategory) {
      return `${category.label} → ${subcategory.label}`;
    } else if (category) {
      return category.label;
    }
    return "All Protocols";
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            EMS Patient Care Protocols
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Evidence-based protocols for emergency medical services
          </p>
        </div>

        <div className="space-y-8">
          {/* Main Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map(({ id, label, icon: Icon, color }) => (
              <Button
                key={id}
                onClick={() => handleCategoryClick(id)}
                className={cn(
                  "h-24 text-lg font-semibold text-white transition-all",
                  color,
                  selectedCategory === id && "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-blue-500"
                )}
              >
                <Icon className="mr-2 h-6 w-6" />
                {label}
              </Button>
            ))}
          </div>

          {/* Subcategories */}
          {selectedCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {subcategories[selectedCategory as keyof typeof subcategories].map(
                ({ id, label, icon: Icon, color }) => (
                  <Button
                    key={id}
                    onClick={() => handleSubcategoryClick(id)}
                    className={cn(
                      "h-16 text-lg font-semibold text-white transition-all",
                      color,
                      selectedSubcategory === id && "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-blue-500"
                    )}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {label}
                  </Button>
                )
              )}
            </div>
          )}

          {/* Active Filters Display and Clear Button */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {getActiveCategoryLabel()}
            </h2>
            {(selectedCategory || selectedSubcategory) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Protocol List */}
          <ScrollArea className="h-[400px] rounded-lg border bg-white dark:bg-gray-800 p-4">
            <ProtocolList
              category={selectedCategory}
              subcategory={selectedSubcategory}
              categories={categories}
              subcategories={subcategories}
            />
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}