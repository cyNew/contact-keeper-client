import { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

export default function ContactItem({ contact }) {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const badgeStyle =
    type === "professional" ? "badge-success" : "badge-primary";
  const uppercaseType = `${type[0].toUpperCase() + type.slice(1)}`;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span style={{ float: "right" }} className={`badge ${badgeStyle}`}>
          {uppercaseType}
        </span>
      </h3>
      <ul className="list">
        {email && <ContactInfo icon="fas fa-envelope-open" info={email} />}
        {phone && <ContactInfo icon="fas fa-phone" info={phone} />}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
}

function ContactInfo({ icon, info }) {
  return (
    <li>
      <i className={`fas ${icon}`}></i> {info}
    </li>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
