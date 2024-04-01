import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCaretDown } from "react-icons/io5";
import styled from "styled-components";

// Styled components is used as it provide a clean and efficient way to style React components
// while keeping styles encapsulated and reusable.
// plus it's also easier to locate and update styles as needed

// Container for the dropdown component
const DropdownContainer = styled.div`
  position: relative;
  width: 350px;
  margin-bottom: 10px;
`;

// Header for the dropdown
const DropdownHeader = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  min-height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 8px;
`;

// Container for tags in case of multi-select dropdown
const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  height: 100%;
  width: 85%;
`;

// Tag element for multi-select dropdown
const Tag = styled.span`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-size: 0.9em;
`;

// Close button for tags in multi-select dropdown
const TagCloseButton = styled.span`
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Container for buttons in dropdown header
const ButtonsContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

// Divider between buttons in dropdown header
const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #ccc;
  margin: 0 5px;
`;

// Button for dropdown
const DropdownButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: auto;
  font-size: medium;
  margin-top: auto;
  margin-bottom: auto;
`;

// Container for the dropdown list
const DropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-top-width: 2px;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  z-index: 1001;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  margin-top: 5px;
`;

// List for the dropdown options
const DropdownList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

// List item in the dropdown list
const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
  ${({ selected }) =>
    selected &&
    `
    background-color: #007bff;
    color: white;
    pointer-events: none;
  `}
`;

// CustomSelect component to render the dropdown
function CustomSelect({ options, multiSelect = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(multiSelect ? [] : "");
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handling selection of dropdown item
  const handleItemClick = (item) => {
    if (multiSelect) {
      if (!selectedItems.includes(item)) {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems(item);
      setIsOpen(false);
    }
  };

  // To remove selected tag in multi-select dropdown
  const removeTag = (item) => {
    if (multiSelect) {
      setSelectedItems(
        selectedItems.filter((currentItem) => currentItem !== item)
      );
    } else {
      setSelectedItems("");
    }
  };

  // Clear all selections in multi-select dropdown
  const clearSelections = (e) => {
    e.stopPropagation();
    setSelectedItems([]);
  };

  // Close dropdown when clicked outside
  // If user selected somewhere outside of dropdown menu, then also dropdown should close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={toggleDropdown}>
        {multiSelect ? (
          <TagsContainer>
            {selectedItems.map((item) => (
              <Tag key={item}>
                {item}
                <TagCloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(item);
                  }}
                >
                  <RxCross2 />
                </TagCloseButton>
              </Tag>
            ))}
          </TagsContainer>
        ) : (
          selectedItems && <span>{selectedItems}</span>
        )}
        <ButtonsContainer>
          {selectedItems.length > 0 && (
            <>
              <DropdownButton onClick={clearSelections} title="Clear all">
              <RxCross2 />
              </DropdownButton>
              <Divider />
            </>
          )}
          <DropdownButton title="Toggle dropdown"><IoCaretDown /></DropdownButton>
        </ButtonsContainer>
      </DropdownHeader>
      {isOpen && (
        <DropdownListContainer isOpen={isOpen}>
          <DropdownList>
            {options.map((option) => (
              <ListItem
                key={option}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(option);
                }}
                selected={
                  multiSelect
                    ? selectedItems.includes(option)
                    : selectedItems === option
                }
              >
                {option}
              </ListItem>
            ))}
          </DropdownList>
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
}

export default CustomSelect;
