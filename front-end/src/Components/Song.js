import { Link } from "react-router-dom";

export default function Song({ song }) {
  return (
    <tr>
      <td>
        {song.is_favorite ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td>
        <Link to={`/songs/${song.id}`}>{song.name}</Link>
      </td>
    </tr>
  );
}
