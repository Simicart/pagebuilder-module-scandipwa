import React from 'react';
import { PageBuilderComponent } from 'simi-pagebuilder-react';

import { endPoint, maskedId } from './CmsPage.config';

export function CmsPageContainer() {
    return (
        <PageBuilderComponent endPoint={ endPoint } maskedId={ maskedId } toPreview={ false } />
    );
}

export default CmsPageContainer;
