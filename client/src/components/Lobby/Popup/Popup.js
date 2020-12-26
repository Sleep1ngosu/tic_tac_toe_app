import React, { useState } from 'react'
import { connect } from 'react-redux'
import './Popup.scss'
import { showPopup, hidePopup } from '../../../actions/popup'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

const Popup = (props) => {
	let [formData, setFormData] = useState({
		title: '',
	})

	let [tags, setTags] = useState([])

	let style
	props.isShow
		? (style = { display: 'block' })
		: (style = { display: 'none' })

	const onChange = (e) => {
		setFormData({ [e.target.name]: e.target.value })
	}

	const onSubmit = (e, title, tags) => {
		e.preventDefault()
		props.onSubmit(e, title, tags)
	}

	const tagsOnChange = (tags, currentValue) => {
		if (currentValue[0].length <= 5) {
			setTags(tags)
		}
	}

	return (
		<form
			onSubmit={(e) => onSubmit(e, formData.title, tags)}
			style={style}
			className="lobby__popup"
		>
			<div className="lobby__popup__title">Create new game</div>
			<div className="lobby__popup__body">
				<input
					className="lobby__popup__body__title"
					type="text"
					placeholder="title"
					name="title"
					value={formData.title}
					onChange={(e) => onChange(e)}
				></input>
				{/* <input
					className="lobby__popup__body__input"
					type="text"
					placeholder="tags (start with #)"
					name="tags"
					value={formData.tags}
					onChange={(e) => onChange(e)}
				></input> */}
				<div className="lobby__popup__body__tags">
					<span className="lobby__popup__body__tags__text">
						Tags (max count: 5, max length: 5, for adding press
						enter)
					</span>
					<TagsInput
						value={tags}
						onChange={tagsOnChange}
						maxTags={5}
						onlyUnique={true}
						className="lobby__popup__body__input"
					/>
				</div>
			</div>
			<div className="lobby__popup__footer">
				<button className="lobby__popup__footer__button" type="submit">
					Create
				</button>
			</div>
		</form>
	)
}

const mapStateToProps = (state) => {
	return {
		isShow: state.popup.isShow,
	}
}

export default connect(mapStateToProps)(Popup)
