import ContentWrapper from '@scandipwa/scandipwa/src/component/ContentWrapper';
import Link from '@scandipwa/scandipwa/src/component/Link';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import '@scandipwa/scandipwa/src/route/NoMatch/NoMatch.style.scss';

/** @namespace ScandiSmpagebuilder/Component/Route/NoMatch/OriginalNoMatch/NoMatch */
export class NoMatch extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        cleanUpTransition: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.updateBreadcrumbs();
        this.cleanUpTransition();
    }

    cleanUpTransition() {
        const { cleanUpTransition } = this.props;

        !!cleanUpTransition && cleanUpTransition();
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '',
                name: __('Not Found')
            }
        ];

        !!updateBreadcrumbs && updateBreadcrumbs(breadcrumbs);
    }

    render() {
        return (
            <main block="NoMatch" aria-label={ __('Page not found') }>
                <ContentWrapper
                  mix={ { block: 'NoMatch' } }
                  wrapperMix={ {
                      block: 'NoMatch',
                      elem: 'Wrapper'
                  } }
                  label={ __('Page Not Found Content') }
                >
                    <h1>
                        404
                    </h1>
                    <p block="NoMatch" elem="Subtitle">
                        { __('Page not found') }
                    </p>
                    <p>
                        { /* eslint-disable-next-line max-len */ }
                        { __('Sorry, we can`t find the page you are looking for! Please press a button below to go back to homepage.') }
                    </p>
                    <Link
                      to="/"
                      block="NoMatch"
                      elem="Button"
                      mix={ { block: 'Button' } }
                    >
                        { __('Back to homepage') }
                    </Link>
                </ContentWrapper>
            </main>
        );
    }
}

export default NoMatch;
