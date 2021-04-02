import axios from "axios";
import { useReducer } from "react";
import * as types from "../types";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

export default function ContactState(props) {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: "",
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({
        type: types.GET_CONTACTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({
        type: types.ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Update Contact
  const updateContact = async (contact) => {
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact);

      dispatch({
        type: types.UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: error.response.data.message,
      });
    }

    dispatch({
      type: types.UPDATE_CONTACT,
      payload: contact,
    });
  };

  // Delete Contact
  const deleteContact = async (contactId) => {
    try {
      const res = await axios.delete(`/api/contacts/${contactId}`);

      dispatch({
        type: types.DELETE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({
      type: types.CLEAR_CONTACTS,
    });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({
      type: types.SET_CURRENT,
      payload: contact,
    });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: types.CLEAR_CURRENT,
    });
  };

  // Filter Contacts
  const filterContacts = (filterText) => {
    dispatch({
      type: types.FILTER_CONTACTS,
      payload: filterText,
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: types.CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        addContact,
        deleteContact,
        updateContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}
