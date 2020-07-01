import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styles from '../styles/modules/form.module.scss';
import { TextareaAutosize } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "gatsby";
import { navigate } from "gatsby";

const CONTACT_MUTATION = gql`
  mutation CreateSubmissionMutation($clientMutationId: String!, $rating: Float!, $voornaam: String!, $achternaam: String!, $woonplaats: String!, $email: String!, $opmerkingen: String!){
    createInspraakSubmission(input: {clientMutationId: $clientMutationId, rating: $rating, voornaam: $voornaam, achternaam: $achternaam, woonplaats: $woonplaats, email: $email, opmerkingen: $opmerkingen}) {
      success
      data
    }
  }
`
const labels = {
    1: '"Belachelijk, hier is geen behoefte aan."',
    2: '"Slecht plan, er is niks mis met de huidige situatie."',
    3: '"Middelmatig, niet slecht maar ook zeker niet goed."',
    4: '"Een mooi visitekaartje voor Elburg. Maar het kan nóg beter."',
    5: '"Prachtig! Ik kan niet wachten tot het klaar is."',
  };


const InspraakForm = () => {

    const [hover, setHover] = React.useState(-1);


    const [ratingValue, setRatingValue] = useState(4)
    const [voornaamValue, setVoornaamValue] = useState('')
    const [achternaamValue, setAchternaamValue] = useState('')
    const [opmerkingenValue, setOpmerkingenValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [woonplaatsValue, setWoonplaatsValue] = useState('')
  
    return (
  
        <div className={styles.form_block}>

        <Mutation mutation={CONTACT_MUTATION}>
            
            {(createInspraakSubmission, { loading, error, data }) => (

            <React.Fragment>
            <form
                onSubmit={async event => {
                event.preventDefault()
                createInspraakSubmission({
                    variables: {
                    clientMutationId: 'inspraak',
                    rating: ratingValue,
                    voornaam: voornaamValue,
                    achternaam: achternaamValue,
                    email: emailValue,
                    woonplaats: woonplaatsValue,
                    opmerkingen: opmerkingenValue
                    }
                })
                
                }}
            >                
    

                <label className={styles.ratingLabel } htmlFor="ratingInput">Wat voor waardering zou u de plannen voor de Kopse waard geven? </label>
                
                <div className={styles.rating_wrap}>
                
                    <Rating 
                        required
                        id="ratingInput"
                        type="number"
                        className={styles.rating}
                        value={ratingValue}
                        size="large"
                        onChange={(event, newValue) => {
                            setRatingValue(newValue)
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    {ratingValue !== null && <Box className={styles.ratingText}>{labels[hover !== -1 ? hover : ratingValue]}</Box>}
                
                </div>

                <div className={styles.fullname}>

                    <span>

                        <label htmlFor="voornaamInput">Voornaam </label>
                        <input required
                            id="voornaamInput"
                            type="text"
                            className={styles.voornaam}
                            value={voornaamValue}
                            onChange={event => {
                                setVoornaamValue(event.target.value)
                            }}
                        />

                    </span>

                    <span>

                        <label htmlFor="achternaamInput">Achternaam </label>
                        <input required
                            id="achternaamInput"
                            type="text"
                            className={styles.achternaam} 
                            value={achternaamValue}
                            onChange={event => {
                                setAchternaamValue(event.target.value)
                            }}
                        />

                    </span>
        
                </div>
    
                <label htmlFor="emailInput">E-mail </label>
                <input required
                    id="emailInput"
                    type="email"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    className={styles.email} 
                    value={emailValue}
                    onChange={event => {
                        setEmailValue(event.target.value)
                    }}
                />
                <p className={styles.email_uitleg}>
                    Wij sturen u graag een bevestiging via email.
                </p> 
    
                <label htmlFor="woonplaatsInput">Woonplaats </label>
                <input required
                    id="woonplaatsInput"
                    type="text"
                    className={styles.woonplaats} 
                    value={woonplaatsValue}
                    onChange={event => {
                        setWoonplaatsValue(event.target.value)
                    }}
                />
    
                <label htmlFor="messageInput">Vul hier uw opmerkingen of ideeen in. </label>
                <TextareaAutosize required
                    rowsMin={8}
                    id="messageInput"
                    type="text"
                    className={styles.opmerkingen} 
                    value={opmerkingenValue}
                    onChange={event => {
                        setOpmerkingenValue(event.target.value)
                    }}
                >
                </TextareaAutosize>
    
                <button className={styles.signup_btn} >
                Indienen
                </button>

                <div className={styles.checkbox}>
                    <Checkbox
                        id="voorwaardenCheckbox"
                        required
                        name="voorwaarden"
                        color="primary"
                        inputProps={{ 'aria-label': 'voorwaarden' }}
                    />
                    <label className={styles.checkboxLabel} htmlFor="voorwaardenCheckbox">
                        Ik ga akkoord met de voorwaarden zoals vermeld in de 
                        <Link className={styles.checkboxLabelLink} to={'/privacyverklaring'}>privacyverklaring</Link>
                    </label> 
                </div>
           
            </form>
    
            <div>
    
                {loading && 
                    <p className={styles.laden}>
                        Bezig met indienen...
                    </p>
                }
                {error && (
                    <p className={styles.error}>
                        Er gaat iets mis bij het indienen. Controleer uw input.
                    </p>
                )}
                {data && 
                    <>

                        <p className={styles.success}>
                            Bedankt voor het indienen van uw suggestie.
                        </p>

                        { navigate("/succes/") }

                    </>
                }
            </div>

            </React.Fragment>
            
            )}
    
        </Mutation>

      </div>
  
    );

}

export default InspraakForm;