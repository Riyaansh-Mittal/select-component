import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  width: 300px;
  margin-bottom: 10px;
`;

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

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  height: 100%;
`;

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

const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #ccc;
  margin: 0 5px;
`;

const DropdownButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: auto;
`;

const Tag = styled.span`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-size: 0.9em;
`;

const TagCloseButton = styled.span`
  margin-left: 5px;
  cursor: pointer;
`;

const DropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-top-width: 2px;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  z-index: 1001;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  margin-top: 5px;
`;

const DropdownList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
  ${({ selected }) =>
    selected &&
    `
    background-color: #e9ecef;
    pointer-events: none;
  `}
`;

function CustomSelect({ options, multiSelect = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(multiSelect ? [] : "");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

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

  const removeTag = (item) => {
    if (multiSelect) {
      setSelectedItems(
        selectedItems.filter((currentItem) => currentItem !== item)
      );
    } else {
      setSelectedItems("");
    }
  };

  const clearSelections = (e) => {
    e.stopPropagation();
    setSelectedItems([]);
  };

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
                  &times;
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
                &times;
              </DropdownButton>
              <Divider />
            </>
          )}
          <DropdownButton title="Toggle dropdown">&#9660;</DropdownButton>
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
