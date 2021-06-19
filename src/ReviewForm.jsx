export default function ReviewForm({ onChange }) {
  function handleChange(event) {
    const { target: { name, value } } = event;

    onChange({ name, value });
  }

  return (
    <>
      <div>
        <label htmlFor="reivew-score">
          평점
        </label>
        <input
          type="number"
          id="reivew-score"
          name="score"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="reivew-description">
          리뷰 내용
        </label>
        <input
          type="text"
          id="reivew-description"
          name="description"
          onChange={handleChange}
        />
      </div>
    </>
  );
}
