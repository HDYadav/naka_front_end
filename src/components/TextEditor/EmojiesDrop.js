import React, { Fragment, useState } from "react";
import Emojies from "./EmojiesList";

const EmojiesDrop = ({ textareaRef }) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchEmojis, setSearchEmojis] = useState([]);

  const groups = [...new Set(Emojies.map((emoji) => emoji.group))];

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);

  const duplicateEmojies = [...Emojies];
  duplicateEmojies.sort(() => Math.random() - 0.5);
  const limitedEmojies = duplicateEmojies.slice(0, 90);

  const emojisToShow = Emojies.filter((emoji) => emoji.group === selectedGroup);

  const emojiUniqueName = emojisToShow.filter(
    (emoji) => !emoji.name.includes(":")
  );

  const insertEmoji = (emoji) => {
    textareaRef.current.focus();
    document.execCommand("insertText", false, emoji);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = query.length > 0
    ? Emojies.filter(emoji => emoji.name.toLowerCase().includes(query))
    : [];
    setSearchEmojis(filtered);
  };

  console.warn(searchEmojis,38)

  return (
    <div className="px-4 relative">
      {/* <i class="bi bi-emoji-sunglasses-fill"></i> */}
      <button
        type="button"
        onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
        className="relative"
      >
        <i className="bi bi-emoji-smile text-2xl text-8997A0"></i>
        {/* <span className="emojiRibbon">New</span> */}
      </button>
      {emojiPickerOpen && (
        <div
          className="absolute z-10 mt-2 w-[300px] overflow-auto no-scrollbar origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {/* <button className="text-gray-700 block w-full px-4 py-2 text-left text-sm" onClick={() => insertEmoji('😊')} tabIndex="-1">😊</button> */}

            <div>
              <div className="flex overflow-auto no-scrollbar">
                {/* Render buttons for each group */}
                <button
                  className="p-2 bg-1D4469 mx-1 rounded-full"
                  onClick={() => setSelectedGroup("All")}
                >
                  🔍
                </button>

                {groups.map((group) => (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className="p-2 bg-1D4469 mx-1 rounded-full"
                  >
                    {group === "Smileys & Emotion" && "😎"}
                    {group === "People & Body" && "✋"}
                    {group === "Component" && "🕵️‍♂️"}
                    {group === "Animals & Nature" && "🦁"}
                    {group === "Food & Drink" && "🍷"}
                    {group === "Travel & Places" && "🚝"}
                    {group === "Activities" && "🎁"}
                    {group === "Objects" && "🏀"}
                    {group === "Symbols" && "🕉️"}
                    {group === "Flags" && "🏳️"}
                  </button>
                ))}
              </div>

              {selectedGroup === "All" && (
                <div className="my-3 flex justify-center">
                  <input
                    type="search"
                    className="px-3"
                    placeholder="🔍 Search Your Emoji"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              )}

              <div className="h-[243px] overflow-auto no-scrollbar">
                {/* Render emojis from the selected group */}

                <Fragment>
                  {selectedGroup === "All" &&
                    searchQuery.length <= 0 &&
                    limitedEmojies.map((emoji) => (
                      <button
                        key={emoji.codes}
                        onClick={() => insertEmoji(`${emoji.char}`)}
                        title={emoji.name}
                      >
                        <span className="mx-1">{emoji.char}</span>
                      </button>
                    ))}
                </Fragment>

                <Fragment>
                  {searchQuery.length >= 0 &&
                  
                    searchEmojis.map((emoji) => (
                      <button
                        key={emoji.codes}
                        onClick={() => insertEmoji(`${emoji.char}`)}
                        title={emoji.name}
                      >
                        <span className="mx-1">{emoji.char}</span>
                      </button>
                    ))}
                </Fragment>

                <Fragment>
                  {emojiUniqueName.map((emoji) => (
                    <button
                      key={emoji.codes}
                      onClick={() => insertEmoji(`${emoji.char}`)}
                      title={emoji.name}
                    >
                      <span className="mx-1">{emoji.char}</span>
                    </button>
                  ))}
                </Fragment>
              </div>
            </div>

            {/* Add more emoji buttons */}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiesDrop;
