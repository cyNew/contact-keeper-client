import { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

export default function ContactFilter() {
  const contactContext = useContext(ContactContext);
  const textRef = useRef("");

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (!filtered) {
      textRef.current.value = "";
    }
  });

  const onChange = (e) => {
    if (textRef.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={textRef}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
}
