/* ============================================================
   content.js — EVERYTHING in the Projects and Journey sections.
   Edit the text here; render.js turns it into cards. Each text
   field has an English and a French version side by side:
       title: { en: "…", fr: "…" }
   - Remove a project: delete its { … } block.
   - Add one: copy a block, change the id (must be unique).
   - Optional fields can be deleted entirely: figs, details,
     tech, link, image, wide, more.
   - image: path to a file in assets/projects/ (jpg, png, webp,
     gif, or mp4 for smooth animations). null = text-only card.
   - poster: for an .mp4 image, a still shown before the video plays.
   - credit: optional { text, url } shown on the image (photo credits).
   - link / linkLabel: optional link at the bottom right (default label "Visit ↗").
   - badge: optional short tag in the top-right corner (e.g. LEAD).
   - country: two-letter code, shows a small flag (files in
     assets/flags/: fr, it, de, se, au — from flag-icons, MIT).
   - wide: true makes the card span two columns (use it for the
     ones with a strong image).
   - more: true hides the card behind the "Show more" button.
   - det / conf: the label that shows up on hover.
   ============================================================ */

const PROJECTS_WORK = [
  {
    id: "droneshield", det: "drone", conf: 98.7,
    org: "DroneShield", when: "2026", where: "Sydney", country: "au",
    image: "assets/projects/droneshield.jpg",
    credit: { text: "DroneShield · DroneSentry-C2 demo", url: "https://www.youtube.com/watch?v=v4rVtau3pe4" },
    title: { en: "Counter-drone vision", fr: "Vision anti-drone" },
    desc: {
      en: "The camera side of a multi-sensor counter-drone system: a real-time video pipeline, from raw frames to detection, tracking and steering the camera onto the target.",
      fr: "La partie caméra d'un système anti-drone multi-capteurs : un pipeline vidéo temps réel, des images brutes à la détection, au suivi et au pilotage de la caméra sur la cible."
    },
    figs: [
      { en: "PTZ Controller", fr: "Contrôleur PTZ" },
      { en: "CI time −90%", fr: "Temps de CI −90 %" },
      { en: "DeepStream · TensorRT · gRPC", fr: "DeepStream · TensorRT · gRPC" }
    ],
    details: {
      context: {
        en: "Defence products, so the specifics stay private. Several sensors detect and track drones; my team owned the PTZ camera end to end, from raw video to the detection and tracking models and the camera control.",
        fr: "Des produits de défense, donc les détails restent privés. Plusieurs capteurs détectent et suivent les drones ; mon équipe était responsable de la caméra PTZ de bout en bout, de la vidéo brute aux modèles de détection et de suivi, jusqu'au pilotage de la caméra."
      },
      approach: {
        en: "Paid down a large amount of technical debt, starting with the data races spread across the pipeline. Cut CI pipeline time by 90% while improving test coverage. Fixed a range of bugs reported by customers. Built the feature that searches for a drone with the camera once other sensors (radar, RF…) have detected it, even when those sensors are not mounted next to the camera.",
        fr: "Réduction importante de la dette technique, à commencer par les data races présentes un peu partout dans le pipeline. Durée des pipelines CI réduite de 90 % tout en améliorant la couverture de tests. Correction de bugs variés remontés par les clients. Développement de la fonctionnalité qui recherche avec la caméra un drone détecté par d'autres capteurs (radar, RF…), même quand ces capteurs ne sont pas installés au même endroit que la caméra."
      },
      results: [
        { en: "CI pipelines 10× faster with improved coverage", fr: "Pipelines CI 10× plus rapides, avec une meilleure couverture de tests" },
        { en: "Camera search triggered by radar / RF detections, with sensors at different locations", fr: "Recherche caméra déclenchée par les détections radar / RF, avec des capteurs à des endroits différents" },
        { en: "NVIDIA stack upgraded to use its latest features", fr: "Stack NVIDIA mise à jour pour exploiter ses dernières fonctionnalités" }
      ]
    },
    tech: ["C++", "DeepStream", "TensorRT", "CUDA", "GStreamer", "gRPC", "snap"]
  },
  {
    id: "zed-lead", det: "team_lead", conf: 94.8,
    org: "Stereolabs", when: "2025 — 2026", where: "Paris", country: "fr", badge: "LEAD",
    image: "assets/projects/zed-lead.jpg",
    credit: { text: "Stereolabs, ZED SDK 5", url: "https://www.stereolabs.com/en-fr/blog/introducing-terra-ai-new-artificial-general-intelligence-for-robots" },
    title: { en: "Leading the ZED SDK team", fr: "Diriger l'équipe ZED SDK" },
    desc: {
      en: "Lead Software Engineer for the ZED SDK: ran the team, kept Embedded, AI, Data and Product on synchronised roadmaps, and reported to the C-suite.",
      fr: "Lead Software Engineer du ZED SDK : management de l'équipe, roadmaps synchronisées pour l'Embedded, l'IA, la Data et le Produit, et reporting direct au C-level."
    },
    figs: [
      { en: "~20 engineers · 5 teams", fr: "~20 ingénieurs · 5 équipes" },
      { en: "SDK 5.2.x & 5.3.0", fr: "SDK 5.2.x & 5.3.0" }
    ],
    details: {
      context: {
        en: "A widely used SDK, customers on many platforms, several technical verticals, and a release train that had to keep moving.",
        fr: "Un SDK très utilisé, des clients sur de nombreuses plateformes, plusieurs verticales techniques, et un train de releases qui ne devait pas s'arrêter."
      },
      approach: {
        en: "1:1s and annual reviews with direct reports. Managed how senior and principal engineers worked with the rest of the organisation. Owned the roadmap sync between the SW, AI, Embedded SW and Data leads. Raised the bar on code quality, CI/CD and regression management.",
        fr: "1:1 et entretiens annuels avec mes collaborateurs directs. Gestion des interactions entre les profils senior / principal et le reste de l'organisation. Responsable de la synchronisation de la roadmap entre les leads SW, IA, Embedded SW et Data. Relèvement des standards de qualité de code, de CI/CD et de gestion des régressions."
      },
      results: [
        { en: "Released ZED SDK 5.2.x and 5.3.0", fr: "Sortie du ZED SDK 5.2.x et 5.3.0" },
        { en: "Stability, quality and feature gains across the SDK", fr: "Gains de stabilité, de qualité et de fonctionnalités sur tout le SDK" }
      ]
    },
    tech: ["Leadership", "Roadmap", "Release management", "CI/CD"]
  },
  {
    id: "zed-sdk", det: "zed_sdk", conf: 96.2,
    org: "Stereolabs", when: "2024 — 2026", where: "Paris", country: "fr",
    image: "assets/projects/zed-sdk.jpg",
    credit: { text: "Stereolabs · ZED SDK object detection samples", url: "https://github.com/stereolabs/zed-sdk/tree/master/object%20detection" },
    title: { en: "Inside the ZED SDK: detection, segmentation, tracking",
             fr: "Au cœur du ZED SDK : détection, segmentation, tracking" },
    desc: {
      en: "Core work on the SDK itself: object detection, instance segmentation, tracking and multi-camera fusion, voxels, and the Python API customers build on. All of it running in real time on NVIDIA Jetson.",
      fr: "Travail sur le cœur du SDK : détection d'objets, segmentation d'instances, tracking et fusion multi-caméras, voxels, et l'API Python sur laquelle les clients construisent. Le tout en temps réel sur NVIDIA Jetson."
    },
    figs: [
      { en: "Real-time", fr: "Temps réel" },
      { en: "C++ · CUDA · Python · Cython", fr: "C++ · CUDA · Python · Cython" }
    ],
    details: {
      context: {
        en: "Stereo cameras used in robots, tractors and warehouses. Every feature shares a small embedded GPU with depth estimation and everything else the SDK does.",
        fr: "Des caméras stéréo utilisées dans des robots, des tracteurs et des entrepôts. Chaque fonctionnalité partage un petit GPU embarqué avec l'estimation de profondeur et tout le reste du SDK."
      },
      approach: {
        en: "Improved and maintained the SDK's perception modules in C++, with TensorRT, CUDA and Nsight profiling. Enhanced object tracking and multi-camera detection fusion. Wrote row detection in C++ for bird's-eye views of vineyards and orchards. Maintained and extended the Python API (Cython). Started with an internal proof of concept of a multi-task network.",
        fr: "Amélioration et maintenance des modules de perception du SDK en C++, avec TensorRT, CUDA et du profiling Nsight. Évolution du tracking et de la fusion multi-caméras des détections. Détection de lignes en C++ sur des vues de dessus de vignes et de vergers. Maintenance et extension de l'API Python (Cython). Début avec une preuve de concept interne de réseau multi-tâche."
      },
      results: [
        { en: "Features shipped in ZED SDK releases", fr: "Fonctionnalités livrées dans les versions du ZED SDK" },
        { en: "Python API kept in step with the C++ SDK", fr: "API Python maintenue au niveau du SDK C++" },
        { en: "Technical debt paid down, team moved to stricter coding practices", fr: "Dette technique réduite, équipe passée à des pratiques de code plus strictes" }
      ]
    },
    tech: ["C++", "CUDA", "TensorRT", "Cython", "PyTorch", "Jetson"]
  },
  {
    id: "zenseact", det: "lane_detector", conf: 97.5,
    org: "Zenseact (Volvo Cars)", when: "2022 — 2024", where: "Göteborg", country: "se",
    image: "assets/projects/zenseact.jpg",
    credit: { text: "Zenseact Open Dataset · © 2022 Zenseact AB · CC BY-SA", url: "https://zod.zenseact.com/license/" },
    title: { en: "Camera to 3D lanes, for Volvo & Polestar", fr: "De la caméra aux voies 3D, pour Volvo & Polestar" },
    desc: {
      en: "Deep networks that turn camera images into a 3D lane representation for ADAS and autonomous driving, from training all the way into the car.",
      fr: "Des réseaux de neurones qui transforment les images caméra en représentation 3D des voies pour l'ADAS et la conduite autonome, de l'entraînement jusqu'à la voiture."
    },
    figs: [
      { en: "In-car · TensorRT", fr: "Embarqué · TensorRT" },
      { en: "TensorFlow", fr: "TensorFlow" },
      { en: "C++ / CUDA post-processing", fr: "Post-traitement C++ / CUDA" }
    ],
    details: {
      context: {
        en: "“Lane Detection” team of a production perception stack: safety-critical code, other teams depending on the output, and KPIs that decide what ships.",
        fr: "Équipe « Lane Detection » d'une stack de perception de production : du code safety-critical, d'autres équipes qui dépendent de l'output, et des KPI qui décident de ce qui part en production."
      },
      approach: {
        en: "Trained and fine-tuned a multi-task network; built KPIs together with the teams using them. Deployed the network in the car with TensorRT and CUDA. Real-time post-processing in C++ and CUDA: filtering, clustering, 2D → 3D projection. Safety-critical C++ (QM/ASIL).",
        fr: "Entraînement et fine-tuning d'un réseau multi-tâches ; construction des KPI avec les équipes utilisatrices. Déploiement du réseau dans la voiture avec TensorRT et CUDA. Post-traitement temps réel en C++ et CUDA : filtrage, clustering, projection 2D → 3D. C++ critique pour la sécurité (QM/ASIL)."
      },
      results: [
        { en: "Network integrated into the perception stack of production vehicles", fr: "Réseau intégré à la stack de perception de véhicules de série" },
        { en: "Real-time C++ / CUDA post-processing, written to QM/ASIL standards", fr: "Post-traitement C++ / CUDA temps réel, aux standards QM/ASIL" }
      ]
    },
    tech: ["TensorFlow", "TensorRT", "C++", "CUDA", "Bazel"]
  },
  {
    id: "smart-spraying", det: "weed", conf: 91.3,
    org: "Bosch × BASF", when: "2021 — 2022", where: "Stuttgart", country: "de", badge: "LEAD",
    image: "assets/projects/smart-spraying.jpg",
    credit: { text: "Bosch BASF Smart Farming" },
    title: { en: "Smart Spraying: weeds, spotted in real time", fr: "Smart Spraying : les mauvaises herbes, repérées en temps réel" },
    desc: {
      en: "Technical lead on the vision side of a sprayer that spots weeds with a camera while the tractor drives, so it only sprays where it needs to.",
      fr: "Tech lead côté vision d'un pulvérisateur qui repère les mauvaises herbes à la caméra pendant que le tracteur roule, pour ne traiter que là où c'est nécessaire."
    },
    figs: [
      { en: "NPU · i.MX8 QXP", fr: "NPU · i.MX8 QXP" },
      { en: "Quantized detector", fr: "Détecteur quantifié" }
    ],
    details: {
      context: {
        en: "Trained on an RTX 3090, deployed on an NXP i.MX8: a tiny power budget, in a field, at driving speed.",
        fr: "Entraîné sur RTX 3090, déployé sur NXP i.MX8 : un budget énergétique minuscule, en plein champ, à vitesse de conduite."
      },
      approach: {
        en: "Re-implemented and optimised an FCOS-style detector; trained a crop-row detector; built layer visualisations that drove architecture changes; benchmarked the quantized model on several NPU-equipped targets.",
        fr: "Réimplémentation et optimisation d'un détecteur type FCOS ; entraînement d'un détecteur de lignes de plantation ; visualisations des couches qui ont orienté l'architecture ; benchmark du modèle quantifié sur plusieurs cibles équipées de NPU."
      },
      results: [
        { en: "Quantized detection running on the embedded NPU", fr: "Détection quantifiée tournant sur le NPU embarqué" },
        { en: "Architecture choices backed by layer-level visualisation and by deployment metrics", fr: "Choix d'architecture appuyés par la visualisation des couches et les métriques de déploiement" }
      ]
    },
    tech: ["PyTorch", "TensorFlow", "Quantization", "i.MX8", "Yocto"]
  },
  {
    id: "followme", det: "human_follower", conf: 89.6,
    org: "Technology & Strategy", when: "2020", where: "Stuttgart", country: "de", badge: "LEAD",
    image: "assets/projects/followme.jpg",
    credit: { text: "Photo: DNA / Jean-Christophe Dorn" },
    title: { en: "FollowMe: a robot that follows a person", fr: "FollowMe : un robot qui suit une personne" },
    desc: {
      en: "Lead developer of a robot that recognises a person and follows them using a camera, running on a Jetson TX2.",
      fr: "Lead developer d'un robot qui reconnaît une personne et la suit grâce à une caméra, sur Jetson TX2."
    },
    figs: [
      { en: "Jetson TX2", fr: "Jetson TX2" },
      { en: "Team in DE + FR", fr: "Équipe DE + FR" }
    ],
    details: {
      context: {
        en: "An in-house R&D project. I also co-initiated the Möglingen R&D centre and ran its vision perception branch.",
        fr: "Un projet R&D interne. J'ai aussi co-lancé le centre R&D de Möglingen et piloté sa branche perception visuelle."
      },
      approach: {
        en: "Defined and implemented the software architecture in C++; deployed OpenPose; person identification and 2D tracking; 3D pose estimation; Jenkins CI; Scrum.",
        fr: "Définition et implémentation de l'architecture logicielle en C++ ; déploiement d'OpenPose ; identification et tracking 2D ; estimation de pose 3D ; CI Jenkins ; Scrum."
      },
      results: [
        { en: "Working proof of concept on the robot", fr: "Preuve de concept fonctionnelle sur le robot" },
        { en: "Led developers across Germany and France", fr: "Encadrement de développeurs en Allemagne et en France" }
      ]
    },
    tech: ["C++", "OpenPose", "OpenCV", "Jetson TX2", "Jenkins"]
  },
  {
    id: "forklift", det: "forklift_safety", conf: 93.0, more: true,
    org: "Bosch", when: "2019", where: "Abstatt", country: "de",
    image: "assets/projects/forklift.jpg",
    credit: { text: "Image: Bosch" },
    title: { en: "A 360° fisheye camera system for forklifts", fr: "Un système caméra fisheye 360° pour chariots élévateurs" },
    desc: {
      en: "Free-space and moving-object detection around a forklift from four fisheye cameras, with a quantized segmentation network on an i.MX6.",
      fr: "Détection d'espace libre et d'objets en mouvement autour d'un chariot élévateur à partir de quatre caméras fisheye, avec un réseau de segmentation quantifié sur i.MX6."
    },
    figs: [
      { en: "4 fisheye", fr: "4 fisheye" },
      { en: "PoC validated", fr: "PoC validée" }
    ],
    details: {
      context: {
        en: "Bringing a passenger-car multi-camera system to logistics, where the vehicle drives backwards half the time and people walk right next to it.",
        fr: "Adapter un système multi-caméras automobile à la logistique, où le véhicule roule en marche arrière la moitié du temps et où des gens circulent juste à côté."
      },
      approach: {
        en: "Deployed a quantized U-Net on the i.MX6 (C++98/11, NEON); built the GStreamer pipeline from raw fisheye images to post-processed network output, in software- and hardware-in-the-loop (ADTF).",
        fr: "Déploiement d'un U-Net quantifié sur i.MX6 (C++98/11, NEON) ; pipeline GStreamer de l'image fisheye brute à la sortie post-traitée du réseau, en SiL et en HiL (ADTF)."
      },
      results: [
        { en: "Proof of concept demonstrated and validated", fr: "Preuve de concept démontrée et validée" }
      ]
    },
    tech: ["U-Net", "Quantization", "GStreamer", "C++", "i.MX6"]
  },
  {
    id: "cedeo", det: "ar_assistant", conf: 88.4, more: true,
    org: "Cedeo.net", when: "2018", where: "Turin", country: "it", badge: { en: "INTERNSHIP", fr: "STAGE" },
    image: null,
    title: { en: "AR for the factory floor", fr: "De l'AR pour l'atelier" },
    desc: {
      en: "R&D internship (Erasmus) in Italy: a client/server augmented-reality app that spots issues on production machines and guides the fix, and an image-processing tool that checks component placement during car manufacturing.",
      fr: "Stage R&D (Erasmus) en Italie : une appli client/serveur de réalité augmentée qui repère les problèmes sur des machines de production et guide la réparation, et un outil de traitement d'image qui vérifie le placement des composants pendant l'assemblage automobile."
    },
    figs: [
      { en: "Windows + Android", fr: "Windows + Android" },
      { en: "Unity · AR", fr: "Unity · AR" }
    ],
    tech: ["Unity", "C#", "C++", ".NET", "Android"]
  },
  {
    id: "cea", det: "slam_tracker", conf: 90.8, more: true,
    org: "CEA List", when: "2018", where: "Saclay", country: "fr", badge: { en: "INTERNSHIP", fr: "STAGE" },
    image: null,
    title: { en: "Auto-exposure for visual SLAM", fr: "Auto-exposition pour le SLAM visuel" },
    desc: {
      en: "End-of-studies internship in a research lab working on visual SLAM: a camera auto-exposure algorithm that maximises the gradient information the SLAM can track, and an optimised pose computation.",
      fr: "Stage de fin d'études dans un laboratoire de recherche sur le SLAM visuel : un algorithme d'auto-exposition de la caméra qui maximise l'information de gradient exploitable par le SLAM, et l'optimisation du calcul de pose."
    },
    figs: [
      { en: "Visual SLAM", fr: "SLAM visuel" },
      { en: "Research lab", fr: "Laboratoire de recherche" }
    ],
    tech: ["C++", "Computer Vision", "SLAM", "3D Vision"]
  }
];

const PROJECTS_SIDE = [
  {
    id: "showtracker", det: "show_tracker", conf: 99.4,
    org: "showtracker.dev", when: "2026",
    badge: { en: "LIVE", fr: "EN LIGNE" }, badgeStyle: "ship",
    link: "https://showtracker.dev/",
    image: "assets/projects/showtracker.jpg",
    title: { en: "ShowTracker", fr: "ShowTracker" },
    desc: {
      en: "TV Time shut down and none of the replacements did the job, so I built my own, and I keep adding what I need: shows episode by episode, films, manga scans and stats. Android, iOS and web from one codebase, used by family and friends.",
      fr: "TV Time a fermé et aucun remplaçant ne me convenait, alors j'ai construit le mien, et j'y ajoute ce qui m'intéresse : séries épisode par épisode, films, scans et statistiques. Android, iOS et web depuis une seule base de code, utilisé par la famille et les amis."
    },
    figs: [
      { en: "3 platforms · 1 codebase", fr: "3 plateformes · 1 base de code" },
      { en: "Used by family & friends", fr: "Utilisé par la famille & les amis" }
    ],
    details: {
      approach: {
        en: "Expo (React Native) front end; Supabase Postgres with row-level security; TMDB and AniList data; a daily edge function refreshes air dates. Imports a full TV Time history (GDPR export, films included). Invite-only accounts, installable as a PWA.",
        fr: "Front Expo (React Native) ; Supabase Postgres avec row-level security ; données TMDB et AniList ; une edge function quotidienne rafraîchit les dates de diffusion. Import de tout l'historique TV Time (export RGPD, films compris). Comptes sur invitation, installable en PWA."
      }
    },
    tech: ["TypeScript", "Expo", "React Native", "Supabase"]
  },
  {
    id: "this-site", det: "portfolio", conf: 99.9,
    org: "juliendelclos.com", when: "2026",
    badge: "OPEN SOURCE", badgeStyle: "ship",
    link: "https://github.com/JujuDel/JujuDel.github.io", linkLabel: { en: "Code ↗", fr: "Code ↗" },
    image: "assets/projects/this-site.jpg",
    title: { en: "This website", fr: "Ce site" },
    desc: {
      en: "The page you're reading. The carousel up top runs on my own corrected panoptic annotations; the chess ratings come live from public APIs.",
      fr: "La page que tu lis. Le carrousel du haut tourne sur mes propres annotations panoptiques corrigées ; les classements d'échecs arrivent en direct des API publiques."
    },
    figs: [
      { en: "No framework · no build step", fr: "Sans framework · sans build" },
      { en: "EN / FR", fr: "EN / FR" }
    ],
    details: {
      approach: {
        en: "Mask R-CNN (ONNX) and MobileSAM pre-annotate my photos, corrected by hand in CVAT where needed, then a script resolves panoptic masks and instance boxes that vanilla JS animates. Chess.com and Lichess ratings load on scroll, with a cached static fallback. Every project card is generated from one bilingual content file. Hosted on GitHub Pages.",
        fr: "Mask R-CNN (ONNX) et MobileSAM pré-annotent mes photos, corrigées à la main dans CVAT si besoin, puis un script produit les masques panoptiques et les boîtes d'instances que du JavaScript pur anime. Les classements Chess.com et Lichess se chargent au scroll, avec un repli statique en cache. Chaque carte projet est générée depuis un seul fichier de contenu bilingue. Hébergé sur GitHub Pages."
      }
    },
    tech: ["JavaScript", "HTML / CSS", "ONNX", "CVAT", "GitHub Pages"]
  }
];

/* the scrollable strip under the side projects.
   thumb: an image or .mp4 in assets/older/ (optional). For an .mp4,
   a .jpg with the same name is used as the still before it plays.
   A last "More on GitHub" tile is added automatically. */
const OLDER_PROJECTS = [
  { name: "Mars Lander", year: "2020", url: "https://github.com/JujuDel/MarLander_Genetic", thumb: "assets/older/marslander.mp4",
    line: { en: "A genetic algorithm that learns to land. C++ & OpenGL.", fr: "Un algorithme génétique qui apprend à atterrir. C++ & OpenGL." } },
  { name: "FancyOpenCV", year: "2019 — 2020", url: "https://github.com/JujuDel/FancyOpenCV", thumb: "assets/older/tracking.mp4",
    line: { en: "Fun with OpenCV: detection + tracking, chroma keying, an ASCII-art webcam…", fr: "Pour s'amuser avec OpenCV : détection + tracking, incrustation, webcam en ASCII…" } },
  { name: "VirtualMakeUp", year: "2020", url: "https://github.com/JujuDel/VirtualMakeUp", thumb: "assets/older/virtualmakeup.mp4",
    line: { en: "Finds the iris, lips and teeth to apply virtual make-up.", fr: "Détecte l'iris, les lèvres et les dents pour un maquillage virtuel." } },
  { name: "DoppelGanger", year: "2020", url: "https://github.com/JujuDel/DoppelGanger", thumb: "assets/older/doppelganger.mp4",
    line: { en: "Finds your celebrity look-alike with face embeddings.", fr: "Trouve ton sosie célèbre grâce aux embeddings de visage." } },
  { name: "AI Dots", year: "2019", url: "https://github.com/JujuDel/Processing_0-AI_Dots", thumb: "assets/older/aidots.mp4",
    line: { en: "An incremental genetic algorithm that finds its way, in Processing.", fr: "Un algorithme génétique incrémental qui trouve son chemin, en Processing." } },
  { name: "Car Race", year: "2019", url: "https://github.com/JujuDel/Processing_1-Car_Race", thumb: "assets/older/carrace.mp4",
    line: { en: "Genetic algorithm + reinforcement learning, in Processing.", fr: "Algorithme génétique + apprentissage par renforcement, en Processing." } },
  { name: "Neural net from scratch", year: "2019", url: "https://github.com/JujuDel/Processing_2-Basic_Neural_Network", thumb: "assets/older/nn.mp4",
    line: { en: "MNIST digit recognition, no library.", fr: "Reconnaissance de chiffres MNIST, sans librairie." } }
];

/* the compact timeline at the top of the Projects section.
   card: id of the project card it jumps to (optional) */
const JOURNEY = [
  { org: "DroneShield", card: "droneshield", country: "au", role: { en: "Senior Computer Vision Engineer", fr: "Senior Computer Vision Engineer" }, when: { en: "2026 · Sydney · Australia", fr: "2026 · Sydney · Australie" } },
  { org: "Stereolabs", card: "zed-lead", country: "fr", role: { en: "Lead Software Engineer · Senior DL / 3D CV", fr: "Lead Software Engineer · Senior DL / Vision 3D" }, when: { en: "2024 — 2026 · Paris · France", fr: "2024 — 2026 · Paris · France" } },
  { org: "Zenseact (Volvo)", card: "zenseact", country: "se", role: { en: "Deep Learning Engineer", fr: "Deep Learning Engineer" }, when: { en: "2022 — 2024 · Göteborg · Sweden", fr: "2022 — 2024 · Göteborg · Suède" } },
  { org: "Bosch", card: "smart-spraying", country: "de", role: { en: "Deep Learning Tech Lead · Smart Spraying", fr: "Tech Lead Deep Learning · Smart Spraying" }, when: { en: "2021 — 2022 · Stuttgart · Germany", fr: "2021 — 2022 · Stuttgart · Allemagne" } },
  { org: "Technology & Strategy", card: "followme", country: "de", role: { en: "Lead Developer · Vision Perception", fr: "Lead Developer · Perception visuelle" }, when: { en: "2020 · Stuttgart · Germany", fr: "2020 · Stuttgart · Allemagne" } },
  { org: "Bosch", card: "forklift", country: "de", role: { en: "Vision Perception Engineer · Forklift cameras", fr: "Ingénieur perception visuelle · Chariots élévateurs" }, when: { en: "2019 · Abstatt · Germany", fr: "2019 · Abstatt · Allemagne" } },
  { org: "Cedeo.net", card: "cedeo", country: "it", role: { en: "R&D · AR & image processing (Erasmus)", fr: "R&D · AR & traitement d'image (Erasmus)" }, when: { en: "2018 · Turin · Italy", fr: "2018 · Turin · Italie" } },
  { org: "CEA List", card: "cea", country: "fr", role: { en: "R&D Intern · Visual SLAM", fr: "Stagiaire R&D · SLAM visuel" }, when: { en: "2018 · Saclay · France", fr: "2018 · Saclay · France" } }
];

const EDUCATION = [
  { org: "Télécom SudParis", role: { en: "MSc, High Tech Imaging", fr: "Master, High Tech Imaging" }, when: { en: "2015 — 2018", fr: "2015 — 2018" } },
  { org: "Lycée Marcelin Berthelot", role: { en: "Classes préparatoires", fr: "Classes préparatoires" }, when: { en: "2013 — 2015", fr: "2013 — 2015" } },
  { org: "Prytanée National Militaire", role: { en: "Military high school", fr: "Lycée militaire" }, when: { en: "2010 — 2013", fr: "2010 — 2013" } }
];
