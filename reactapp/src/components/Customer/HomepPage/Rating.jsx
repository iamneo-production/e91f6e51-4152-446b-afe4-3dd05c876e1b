export default function Rating({ rating }) {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  const starIcons = [...Array(5)].map((_, index) => {
    if (index < fullStars) {
      return <span key={index} className="gold-star">&#9733;</span>;
    } else if (index === fullStars && decimal > 0) {
      return <span key={index} className="half-star">&#9733;</span>;
    } else {
      return <span key={index} className="silver-star">&#9733;</span>;
    }
  });

  return <div className="rating">{starIcons}</div>;
}
