import { ModalProps } from "../components/Modal";

export const modalActions: Record<string, ModalProps> = {
  help: {
    title: "Aide 🤔",
    description:
      "Votre mission est de trouver la carte qui cache le trésor 🪙. Une énigme 🕵️‍♂️ vous guide vers l'emplacement correct. Mais attention, vous n'avez que 3 essais ! Cliquez sur une carte pour tenter votre chance. Bonne chance ! 🍀",
    action: () => console.log("Help action executed"),
    textAction: "Compris ✅",
  },
  lost: {
    title: "Oh non ! Vous avez perdu 😢",
    description:
      "Vous avez utilisé tous vos essais. Cliquez ci-dessous pour tenter de trouver un nouveau trésor.",
    action: () => console.log("Restart game"),
    textAction: "Nouvelle Partie 🔄",
  },
  restart: {
    title: "Redémarrer le Jeu 🔄",
    description:
      "Êtes-vous sûr de vouloir recommencer ? Votre progression actuelle sera perdue.",
    action: () => console.log("Game restarted"),
    textAction: "Oui, recommencer 🔁",
  },
  win: {
    title: "🎉 Félicitations, aventurier ! 🎉",
    description: `Vous avez trouvé un nouveau trésor ! 🏆 Il a été ajouté à votre coffre des trésors 🏰. Continuez comme ça et vous serez un véritable héros ! 🚀`,
    textAction: "Explorer mon coffre de trésors 🔍",
    action: () => console.log("Start new game"),
  },
};
