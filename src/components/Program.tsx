
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Flag, Music, Gift, Car } from "lucide-react";

const Program = () => {
  const [activeDay, setActiveDay] = useState("saturday");
  
  const saturdayProgram = [
    { time: "08:00", title: "Ouverture des portes", description: "Accueil des participants et vérifications", icon: <Clock className="h-5 w-5" /> },
    { time: "09:30", title: "Session de roulage groupe A", description: "Modèles Type R et préparés", icon: <Car className="h-5 w-5" /> },
    { time: "11:00", title: "Session de roulage groupe B", description: "S2000 et autres modèles", icon: <Car className="h-5 w-5" /> },
    { time: "12:30", title: "Pause déjeuner", description: "Profitez de nos food trucks", icon: <Clock className="h-5 w-5" /> },
    { time: "14:00", title: "Grande parade NSX", description: "Rassemblement de tous les NSX présents", icon: <Flag className="h-5 w-5" /> },
    { time: "15:30", title: "Session de roulage libre", description: "Tous modèles confondus", icon: <Car className="h-5 w-5" /> },
    { time: "18:00", title: "Concert", description: "Live music avec le groupe Octane", icon: <Music className="h-5 w-5" /> },
    { time: "20:00", title: "Fermeture des portes", description: "À demain pour la suite des festivités!", icon: <Clock className="h-5 w-5" /> },
  ];
  
  const sundayProgram = [
    { time: "08:30", title: "Ouverture des portes", description: "Dernier jour pour profiter de l'événement", icon: <Clock className="h-5 w-5" /> },
    { time: "09:30", title: "Session de roulage exclusive NSX", description: "Réservée au club NSX", icon: <Car className="h-5 w-5" /> },
    { time: "11:00", title: "Parade Type R", description: "Toutes générations confondues", icon: <Flag className="h-5 w-5" /> },
    { time: "12:30", title: "Pause déjeuner", description: "Profitez de nos food trucks", icon: <Clock className="h-5 w-5" /> },
    { time: "14:00", title: "Session de roulage groupes A et B", description: "Alternance toutes les 20 minutes", icon: <Car className="h-5 w-5" /> },
    { time: "16:30", title: "Parade de clôture", description: "Tous modèles Honda confondus", icon: <Flag className="h-5 w-5" /> },
    { time: "17:30", title: "Tombola et remise des prix", description: "De nombreux lots à gagner", icon: <Gift className="h-5 w-5" /> },
    { time: "19:00", title: "Fermeture de l'événement", description: "À l'année prochaine!", icon: <Clock className="h-5 w-5" /> },
  ];

  return (
    <section id="program" className="py-24 bg-honda-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          PROGRAMME <span className="text-honda-red">DÉTAILLÉ</span>
        </h2>
        <p className="text-center mb-12 text-honda-textMuted max-w-2xl mx-auto">
          Découvrez notre programme complet avec ses sessions de roulage, parades,
          expositions et animations tout au long du week-end.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="saturday" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger 
                value="saturday" 
                className={`text-lg py-3 ${activeDay === 'saturday' ? 'bg-honda-red' : 'bg-honda-dark/50'}`}
                onClick={() => setActiveDay("saturday")}
              >
                Samedi 21 Juin
              </TabsTrigger>
              <TabsTrigger 
                value="sunday" 
                className={`text-lg py-3 ${activeDay === 'sunday' ? 'bg-honda-red' : 'bg-honda-dark/50'}`}
                onClick={() => setActiveDay("sunday")}
              >
                Dimanche 22 Juin
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="saturday" className="mt-0">
              <Card className="bg-transparent border-none">
                <CardContent className="p-0">
                  <div className="timeline">
                    {saturdayProgram.map((item, index) => (
                      <div 
                        key={index} 
                        className="timeline-item opacity-0" 
                        style={{ 
                          animationName: 'fade-in',
                          animationDuration: '0.5s',
                          animationFillMode: 'forwards',
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="flex items-start">
                          <div className="mr-4 min-w-16 text-honda-red font-mono">{item.time}</div>
                          <div>
                            <h3 className="text-lg font-medium flex items-center">
                              <span className="mr-2 text-honda-red">{item.icon}</span> 
                              {item.title}
                            </h3>
                            <p className="text-honda-textMuted mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sunday" className="mt-0">
              <Card className="bg-transparent border-none">
                <CardContent className="p-0">
                  <div className="timeline">
                    {sundayProgram.map((item, index) => (
                      <div 
                        key={index} 
                        className="timeline-item opacity-0" 
                        style={{ 
                          animationName: 'fade-in',
                          animationDuration: '0.5s',
                          animationFillMode: 'forwards',
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="flex items-start">
                          <div className="mr-4 min-w-16 text-honda-red font-mono">{item.time}</div>
                          <div>
                            <h3 className="text-lg font-medium flex items-center">
                              <span className="mr-2 text-honda-red">{item.icon}</span> 
                              {item.title}
                            </h3>
                            <p className="text-honda-textMuted mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Program;
