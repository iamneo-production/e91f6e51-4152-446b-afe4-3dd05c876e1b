

export default function Rating({ singleEvent, handleRating }) {
    return (
      <div>
        <div className="">
          {[...Array(5)].map((_, i) => {
            const starRating = i + 1;
            const className = starRating <= singleEvent.rating ? "on" : "off";
            return (
              <span
                key={i}
                className={className}
                onClick={() => handleRating(singleEvent.id, starRating)}
              >
                &#9733;
              </span>
            );
          })}
        </div>
      </div>
    )
  }