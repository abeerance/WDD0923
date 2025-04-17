"use client";

import Image from "next/image";

// export const SimpleProfile = () => {
//   return (
//     <div className="profile">
//       <Image src="avatar.jpg" className="avatar" alt="Alt" />
//       <h2>Willkommen, Benutzer!</h2>
//       <button
//         onClick={() => {
//           console.log("Hello");
//         }}
//       >
//         Sag Hallo
//       </button>
//     </div>
//   );
// };

export const SimpleProfile = () => {
  const sayHello = (): void => {
    console.log("hello");
  };

  return (
    <div className="profile">
      <Image src="" className="avatar" alt="Alt" />
      <h2>Willkommen, Benutzer!</h2>
      <button onClick={sayHello}>Sag Hallo</button>
    </div>
  );
};
