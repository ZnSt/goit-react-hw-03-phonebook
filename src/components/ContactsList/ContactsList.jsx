import PropTypes from "prop-types";

import { Li, Ul } from "./ContactsList.styled";

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <Ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <Li key={id}>
            {name}: {number}
            <button
              onClick={() => onDeleteContact(id)}
              style={{
                width: "100px",
                backgroundColor: "transparent",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </Li>
        );
      })}
    </Ul>
  );
};

ContactsList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  constacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
