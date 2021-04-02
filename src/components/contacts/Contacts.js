import { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

export default function Contacts() {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (contacts && contacts.length === 0 && !loading) {
    return <h4>Please add contacts</h4>;
  }

  const contactsList = filtered ? filtered : contacts;

  return (
    <>
      {contacts && !loading ? (
        <TransitionGroup>
          {contactsList.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem key={contact._id} contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </>
  );
}
