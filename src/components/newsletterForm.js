import React, { Component } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import styles from '../styles/modules/nieuwsbrief.module.scss';
import { Link } from 'gatsby';

const Form = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value
    });

  return (
    <div className={styles.newsletter__form_inner}>
      {status === "sending" && <div className={styles.status_message}>Bezig met versturen...</div>}
      {status === "error" && (
        <div
        className={[styles.status_message, styles.error].join(' ')}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className={[styles.status_message, styles.success].join(' ')}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        className={styles.name_input}
        ref={node => (name = node)}
        type="text"
        placeholder="Volledige naam"
      />
      <input
        className={styles.email_input}
        ref={node => (email = node)}
        type="email"
        placeholder="E-mail adres"
      />
      <button className={styles.signup_btn} onClick={submit}>
        Inschrijven
      </button>
    </div>
  );
};



class NewsletterForm extends Component {
  render() {
    const url =
      "https://dekopsewaard.us4.list-manage.com/subscribe/post?u=094cf40e8ee8f571fb7e18568&amp;id=4a55f5bb1a";
    return (
      <div>
        <h2 className={styles.header}>
          Wilt u op de hoogte blijven?
        </h2>
        <p className={styles.subheader}>
          Meld u dan aan op de nieuwsbrief.
        </p>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <Form
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
        <p className={styles.privacy_text}>
        Wij gaan zorgvuldig om met uw persoongegevens. Voor meer informatie zie onze <Link className={styles.privacy_link} to={'/privacyverklaring'}>Privacyverklaring.</Link>
        </p>
      </div>
    );
  }
}

export default NewsletterForm