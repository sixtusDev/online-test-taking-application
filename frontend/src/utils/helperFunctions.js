import { confirmAlert } from "react-confirm-alert";

export function shuffle(questions, quantity) {
  return questions.sort(() => 0.5 - Math.random()).slice(0, quantity);
}

export function confirmSubmit(title, message, fn) {
  return confirmAlert({
    title,
    message,
    buttons: [
      {
        label: "No",
        onClick: () => {
          return;
        },
      },
      {
        label: "Yes",
        onClick: fn,
      },
    ],
    overlayClassName: "overlay-custom-class-name",
  });
}
