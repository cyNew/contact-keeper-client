import { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/contactContext";

const initState = {
  name: "",
  email: "",
  phone: "",
  type: "personal",
};

export default function ContactForm() {
  const contactContext = useContext(ContactContext);
  const [contact, setContact] = useState(initState);

  const { current, addContact, updateContact, clearCurrent } = contactContext;
  const { name, email, phone, type } = contact;

  const formTitle = current ? "Edit Contact" : "Add Contact";
  const submitTitle = current ? "Update Contact" : "Add Contact";

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact(initState);
    }
  }, [contactContext, current]);

  const onChange = (e) => {
    setContact((contact) => {
      const newContact = Object.assign({}, contact, {
        [e.target.name]: e.target.value,
      });

      return newContact;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{formTitle}</h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={submitTitle}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
}
