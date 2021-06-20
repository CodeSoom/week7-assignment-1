import TextField from './TextField';

export default function ReviewForm({
  score, description, onChange,
  onSubmit,
}) {
  return (
    <>
      <TextField
        label="평점"
        type="number"
        name="score"
        value={score}
        onChange={onChange}
      />
      <TextField
        label="리뷰 내용"
        name="description"
        value={description}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={onSubmit}
      >
        리뷰 남기기
      </button>
    </>
  );
}
