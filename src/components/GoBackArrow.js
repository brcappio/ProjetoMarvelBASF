import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

function GoBackArrow({ onClick }) {
    return (
        <div className="go-back-arrow" onClick={onClick}>
            <IoIosArrowBack className="arrow-icon" />
        </div>
    );
}

export default GoBackArrow;