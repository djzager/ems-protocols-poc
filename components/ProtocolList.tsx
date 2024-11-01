"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import Link from "next/link";

// This would typically be fetched from your MDX files
const mockProtocols = {
  adult: {
    cardiac: [
      { id: "chest-pain", title: "Chest Pain" },
      { id: "cardiac-arrest", title: "Cardiac Arrest" },
      { id: "arrhythmia", title: "Arrhythmia Management" },
    ],
    general: [
      { id: "airway", title: "Airway Management" },
      { id: "trauma", title: "Trauma Assessment" },
      { id: "burns", title: "Burns" },
    ],
  },
  pediatric: {
    cardiac: [
      { id: "ped-cardiac-arrest", title: "Pediatric Cardiac Arrest" },
      { id: "ped-arrhythmia", title: "Pediatric Arrhythmia" },
    ],
    general: [
      { id: "ped-airway", title: "Pediatric Airway" },
      { id: "ped-seizure", title: "Pediatric Seizure" },
    ],
  },
  reference: {
    medications: [
      { id: "med-adenosine", title: "Adenosine" },
      { id: "med-epinephrine", title: "Epinephrine" },
      { id: "med-amiodarone", title: "Amiodarone" },
    ],
    operations: [
      { id: "ops-communication", title: "Communication" },
      { id: "ops-documentation", title: "Documentation" },
    ],
  },
};

interface Category {
  id: string;
  label: string;
  icon: any;
  color: string;
}

interface Subcategory {
  id: string;
  label: string;
  icon: any;
  color: string;
}

interface ProtocolListProps {
  category: string | null;
  subcategory: string | null;
  categories: Category[];
  subcategories: Record<string, Subcategory[]>;
}

export default function ProtocolList({ 
  category, 
  subcategory,
  categories,
  subcategories 
}: ProtocolListProps) {
  const getAllProtocols = () => {
    return Object.entries(mockProtocols).flatMap(([categoryId, categoryProtocols]) =>
      Object.entries(categoryProtocols).flatMap(([subcategoryId, protocols]) =>
        protocols.map(protocol => ({
          ...protocol,
          categoryId,
          subcategoryId,
        }))
      )
    );
  };

  const getProtocolsForCategory = (categoryId: string) => {
    const categoryProtocols = mockProtocols[categoryId as keyof typeof mockProtocols];
    return Object.entries(categoryProtocols).flatMap(([subcategoryId, protocols]) =>
      protocols.map(protocol => ({
        ...protocol,
        categoryId,
        subcategoryId,
      }))
    );
  };

  const getProtocolsForSubcategory = (categoryId: string, subcategoryId: string) => {
    return mockProtocols[categoryId as keyof typeof mockProtocols][subcategoryId].map(protocol => ({
      ...protocol,
      categoryId,
      subcategoryId,
    }));
  };

  const protocols = category
    ? subcategory
      ? getProtocolsForSubcategory(category, subcategory)
      : getProtocolsForCategory(category)
    : getAllProtocols();

  const getCategoryLabel = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.label || categoryId;
  };

  const getSubcategoryLabel = (categoryId: string, subcategoryId: string) => {
    return subcategories[categoryId]?.find(s => s.id === subcategoryId)?.label || subcategoryId;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {protocols.map((protocol) => (
        <Link
          key={protocol.id}
          href={`/protocols/${protocol.categoryId}/${protocol.subcategoryId}/${protocol.id}`}
        >
          <Card className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {protocol.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700">
                  {getCategoryLabel(protocol.categoryId)}
                </Badge>
                <Badge variant="outline">
                  {getSubcategoryLabel(protocol.categoryId, protocol.subcategoryId)}
                </Badge>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}