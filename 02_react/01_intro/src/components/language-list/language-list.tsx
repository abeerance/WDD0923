export const LanguageList = () => {
  const languages: string[] = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "Rust",
    "Zig",
    "C#",
    "Go",
  ];

  //   const languagesArray = [
  //     { id: 1, language: "TypeScript" },
  //     { id: 2, language: "JavaScript" },
  //     { id: 3, language: "Python" },
  //     { id: 4, language: "Java" },
  //     { id: 5, language: "Rust" },
  //     { id: 6, language: "Zig" },
  //     { id: 7, language: "C#" },
  //     { id: 8, language: "Go" },
  //   ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">Programming Languages</h2>
      {/* Here is the unordered list */}
      <ul className="flex flex-col gap-2">
        {/* dynamic expression to map through the languages */}
        {/* {languagesArray.map((language) => (
          <li key={language.id} className="font-semibold">
            {language.language}
          </li>
        ))} */}
        {languages.map((language, index) => (
          <li key={index} className="font-semibold">
            {language}
          </li>
        ))}
      </ul>
    </div>
  );
};
