import React, { useEffect, useState } from 'react';
import './Quotation.scss';
import { getQuotation } from '../../api/openAi';

export const Quotation: React.FC = () => {
  const [quotation, setQuotation] = useState('');

  useEffect(() => {
    getQuotation()
      .then(response => {
        let responseMessage = response.choices[0].message.content;

        if (responseMessage?.startsWith('*')) {
          responseMessage = responseMessage.slice(1);
        }

        if (responseMessage?.endsWith('*')) {
          responseMessage = responseMessage.slice(0, -1);
        }

        responseMessage = '"' + responseMessage + '"';

        if (responseMessage) {
          setQuotation(responseMessage);
        }
      })
      .catch(() => {
        setQuotation(
          'Every small step brings you closer to your big goal 💪✨🚀',
        );
      })
      .finally(() => {});
  }, []);

  return (
    <article className="quotation">
      {quotation ? (
        <p className="quotation__text">{quotation}</p>
      ) : (
        <div className="quotation__loading">
          <div className="quotation__dot"></div>
          <div className="quotation__dot"></div>
          <div className="quotation__dot"></div>
        </div>
      )}
    </article>
  );
};
