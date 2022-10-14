import React from 'react';
import PropTypes from 'prop-types';
import {
	Wrapper,
	Forma,
	LabelForm,
	InputForm,
	Span,
	ErrorText,
	Button,
} from './ContactForm.styled';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';


const schema = yup.object().shape({
	name: yup.string().max(16).required(),
phone: yup.string().required()});

const FormError = ({name}) => {
	return <ErrorMessage name={name} render={message => <ErrorText>{message}</ErrorText>} />
}

export function ContactForm({ submitForm }) {
	const initialValues = {
		name: '',
		phone: '',
	};

	const handleSubmitForm = ({ name, phone }, { resetForm }) => {
		const newContact = {
			name: name,
			phone: phone,
		};
		// передача нового контакта в App
		submitForm(newContact);
		resetForm();
	};

	return (
		<Wrapper>
			<Formik onSubmit={handleSubmitForm} initialValues={initialValues} validationSchema={schema}>
				<Forma>
					<LabelForm>
						<Span>Name</Span>
						<InputForm
							type="text"
							name="name"
							title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
							required
						/>
						<FormError name="name" title="title"/>
					</LabelForm>
					<LabelForm>
						<Span>Number</Span>
						<InputForm
							type="tel"
							name="phone"
							title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
							required
						/>
						<FormError name="number" title="title" />
					</LabelForm>
					<Button type="submit">Add contact</Button>
				</Forma>
			</Formik>
		</Wrapper>
	);
}


ContactForm.propTypes = {
	submitForm: PropTypes.func.isRequired,
  };