import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { createBearer,createAccess } from './service_token';

const Medical_camp = () => {
  const embedUrl = 'https://app.powerbi.com/reportEmbed?';
  const groupId = '03a13b57-1339-4323-b59c-9cf096012d4b';
  const reportId = 'bf2f1458-2926-4da1-b0c7-eafc6f3c82ef';
  const dataSetId = 'd07d76e6-dded-45f6-b689-c54856141518';
  const [reportConfig, setReportConfig] = useState({
    type: 'report',
    embedUrl: `${embedUrl}reportId=${reportId}&groupId=${groupId}`,
    permissions: 7,
    tokenType: models.TokenType.Embed,
    accessToken: '',
    settings: {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const bearerToken = await createBearer();
        if (bearerToken) {
          const accessTokenData = await createAccess(reportId,dataSetId,bearerToken);
          if (accessTokenData) {
            setReportConfig(prevConfig => ({
              ...prevConfig,
              accessToken: accessTokenData.token, // Adjust this according to the actual response structure
            }));
          } else {
            console.error('Failed to create access token.');
          }
        } else {
          console.error('Failed to fetch bearer token.');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="report-container" style={{ height: '100vh', width: '100vw' }}>
    {reportConfig.accessToken ? (
      <PowerBIEmbed
        embedConfig={reportConfig}
        cssClassName="report-container"
        getEmbeddedComponent={(embedObject) => {
          console.log(`Embedded object of type "${embedObject.embedtype}" received`);
        }}
      />
    ) : (
      <p>Loading report...</p>
    )}
  </div>
  );
};

export default Medical_camp;
