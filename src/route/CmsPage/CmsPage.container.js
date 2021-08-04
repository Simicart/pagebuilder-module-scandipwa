import React from 'react';
import { PageBuilderComponent } from 'simi-pagebuilder-react';

import { Placeholder } from 'Route/CmsPage/Placeholder';

import { endPoint, maskedId } from './CmsPage.config';

export function CmsPageContainer() {
    return (
        <PageBuilderComponent
          endPoint={ endPoint }
          maskedId={ maskedId }
          toPreview={ false }
          Category={ Placeholder }
        />
    );
}

export default CmsPageContainer;
