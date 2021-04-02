import * as types from "../types";

export default function contactReducer(state, action) {
  switch (action.type) {
    case types.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case types.ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };

    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload._id
        ),
        loading: false,
      };

    case types.UPDATE_CONTACT:
      const newContacts = state.contacts.map((contact) =>
        contact._id === action.payload._id ? action.payload : contact
      );

      return {
        ...state,
        contacts: newContacts,
      };

    case types.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
        loading: false,
      };

    case types.CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case types.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case types.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case types.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
}
