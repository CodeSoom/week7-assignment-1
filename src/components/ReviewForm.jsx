import React from 'react';

import TextField from './TextField';

export default function ReviewForm({ fields, onChange, onSubmit }) {
  const { score, description } = fields;

  return (
    <>
      <TextField
        label="평점"
        name="score"
        type="number"
        value={score}
        onChange={onChange}
      />
      <TextField
        type="text"
        label="리뷰내용"
        name="description"
        value={description}
        onChange={onChange}
      />
      <button type="button" onClick={onSubmit}>
        리뷰 남기기
      </button>
    </>
  );
}
