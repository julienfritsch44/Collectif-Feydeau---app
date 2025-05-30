import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Info } from "lucide-react";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import { getImagePath } from "@/utils/imagePaths";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { isOnline } from "@/utils/serviceWorkerRegistration";
import { preloadSingleHistoryImage, isHistoryImageCached } from "@/services/offlineService";
import { createLogger } from "@/utils/logger";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations } from "@/data/locations";

// Créer un logger pour le composant LocationHistory
const logger = createLogger('LocationHistory');

export function LocationHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [imagesLoading, setImagesLoading] = useState<Record<string, boolean>>({});
  
  // Récupérer le locationId depuis l'état de navigation s'il existe
  const locationIdFromState = location.state?.selectedLocationId;
  logger.info("ID du lieu reçu en paramètre:", { locationId: locationIdFromState });
  
  // Vérifier d'abord si l'ID reçu correspond à un lieu existant
  const locationFromState = locationIdFromState ? locations.find(loc => loc.id === locationIdFromState) : null;
  logger.info("Lieu trouvé avec cet ID:", { locationName: locationFromState?.name || "Aucun" });
  
  // Filtrer uniquement les lieux qui ont un historique
  let locationsWithHistory = locations
    .filter(loc => loc.history) // Garder uniquement les lieux avec historique
    .filter((loc, index, self) => {
      // Éliminer les doublons basés sur le nom
      return index === self.findIndex(l => l.name === loc.name);
    });
  
  // Si le lieu reçu en paramètre a un historique mais n'est pas dans la liste, l'ajouter
  if (locationFromState?.history && !locationsWithHistory.some(loc => loc.id === locationIdFromState)) {
    locationsWithHistory.push(locationFromState);
    console.log("Ajout du lieu reçu en paramètre à la liste des lieux avec historique");
  }
  
  const [selectedLocation, setSelectedLocation] = useState(() => {
    // Si on a reçu un ID valide, l'utiliser
    if (locationIdFromState && locations.find(loc => loc.id === locationIdFromState)?.history) {
      return locationIdFromState;
    }
    // Sinon, utiliser le premier emplacement disponible
    return locationsWithHistory[0]?.id || null;
  });

  // Trouver le lieu sélectionné
  const selectedLocationData = locationsWithHistory.find(loc => loc.id === selectedLocation);
  
  // Précharger l'image du lieu sélectionné pour le mode hors-ligne
  useEffect(() => {
    if (selectedLocationData?.image) {
      const imagePath = getImagePath(selectedLocationData.image);
      
      // Vérifier si l'image est déjà en cache
      if (!isHistoryImageCached(imagePath)) {
        setImagesLoading(prev => ({ ...prev, [imagePath]: true }));
        
        // Précharger l'image
        preloadSingleHistoryImage(imagePath)
          .then(success => {
            logger.info(`Préchargement de l'image ${success ? 'réussi' : 'échoué'}:`, { imagePath });
            setImagesLoading(prev => ({ ...prev, [imagePath]: false }));
          })
          .catch(error => {
            logger.error(`Erreur lors du préchargement de l'image:`, { imagePath, error });
            setImagesLoading(prev => ({ ...prev, [imagePath]: false }));
          });
      }
    }
  }, [selectedLocationData]);

  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-4">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Histoire des lieux</h1>
      </div>

      {/* Liste déroulante des lieux */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2 text-[#4a5d94]">Sélectionnez un lieu</h2>
        <Select
          value={selectedLocation}
          onValueChange={(value) => setSelectedLocation(value)}
        >
          <SelectTrigger className="w-full border-[#4a5d94] text-[#4a5d94]">
            <SelectValue placeholder="Choisir un lieu" />
          </SelectTrigger>
          <SelectContent>
            {locationsWithHistory.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Détails du lieu sélectionné */}
      {selectedLocationData ? (
        <Card className="shadow-md border-[#d8e3ff] mb-6">
          <CardHeader className="pb-6">
            <div className="flex flex-col mb-2">
              <div className="flex justify-between items-center w-full mb-4">
                <CardTitle className="text-xl font-bold text-[#4a5d94] mr-2">
                  {selectedLocationData.name}
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#4a5d94] text-[#4a5d94] hover:bg-[#4a5d94] hover:text-white whitespace-nowrap px-2 py-1 text-xs flex-shrink-0"
                  onClick={() => {
                    // Rediriger vers la carte avec le point mis en évidence
                    navigate('/map', { 
                      state: { 
                        highlightLocationId: selectedLocationData.id,
                        fromHistory: true // Indiquer que la navigation vient de l'historique
                      } 
                    });
                  }}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  Voir sur la carte
                </Button>
              </div>
              <CardDescription className="text-sm text-slate-600 mt-2 mb-2">
                {selectedLocationData.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {selectedLocationData.image && (
              <div className="mb-4">
                {/* Utiliser une div avec background-image comme solution de secours */}
                <div 
                  className="w-full h-64 rounded-md shadow-md border border-[#d8e3ff] relative"
                  style={{
                    backgroundImage: `url(${getImagePath(selectedLocationData.image)})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  {/* Indicateur de chargement */}
                  {imagesLoading[getImagePath(selectedLocationData.image)] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                      <Loader2 className="h-8 w-8 animate-spin text-[#4a5d94]" />
                    </div>
                  )}
                  
                  {/* Image cachée pour détecter les erreurs de chargement */}
                  <img 
                    src={getImagePath(selectedLocationData.image)} 
                    alt={`Photo historique de ${selectedLocationData.name}`} 
                    className="hidden"
                    onError={(e) => {
                      // Log l'erreur
                      logger.error(`Erreur de chargement de l'image:`, { 
                        image: selectedLocationData.image,
                        online: isOnline()
                      });
                    }}
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">Photo de {selectedLocationData.name}</p>
              </div>
            )}
            
            <h3 className="text-base font-bold text-[#4a5d94] mb-3 pb-1 border-b border-[#d8e3ff]">
              Histoire complète
            </h3>
            
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                {selectedLocationData.history?.split('\n\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <div key={index} className="mb-4">
                      {paragraph.startsWith('#') ? (
                        <h4 className="text-lg font-bold text-[#4a5d94] mb-2">
                          {paragraph.replace('#', '').trim()}
                        </h4>
                      ) : (
                        <p className="text-[#4a5d94] leading-relaxed text-sm">{paragraph}</p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-10 border rounded-lg border-dashed border-gray-300 bg-gray-50">
          <Info className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 mb-1">Sélectionnez un lieu</p>
          <p className="text-gray-400 text-sm">Pour afficher son histoire complète</p>
        </div>
      )}

      {/* Bouton fixe Retour à la carte */}
      <div className="fixed bottom-20 left-0 right-0 mx-auto max-w-md px-4 z-10">
        <Button 
          className="w-full bg-[#ff7a45] hover:bg-[#ff9d6e] text-white text-sm min-h-[44px]"
          onClick={() => {
            // Rediriger vers la carte sans paramètres spécifiques
            navigate('/map');
          }}
        >
          Retour à la carte
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};
