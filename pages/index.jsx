import { useState, useEffect } from 'react';

export default function Home({}) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    fetch('api/users/5fc124b2789915870c483650', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((json) =>
        setUser({
          ...json.user,
          matches: json.matches,
        }),
      );
  }, []);

  return (
    <div>
      {user && (
        <div>
          <p>{user.firstName}</p>
          <ul>
            <li>
              Wins:{' '}
              {
                user.matches.filter(
                  (match) =>
                    match.opponent._id === user._id &&
                    match.result === 'win',
                ).length
              }
            </li>
            <li>
              Losses:{' '}
              {
                user.matches.filter(
                  (match) =>
                    match.opponent._id === user._id &&
                    match.result === 'loss',
                ).length
              }
            </li>
            <li>
              Draws:{' '}
              {
                user.matches.filter(
                  (match) =>
                    match.opponent._id === user._id &&
                    match.result === 'draw',
                ).length
              }
            </li>
          </ul>
          <p>Matches:</p>
          {user.matches.map((match) => (
            <div>
              <div>
                {match.result} - {match.opponent.fullName} vs{' '}
                {match.challenger.fullName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
