import { render, screen } from "@testing-library/react";

import { Posts } from '.'

const props = {
    posts: [
        {
            id: 1,
            title: 'title 1',
            body: 'body 1',
            cover: 'img/1.png'
        },

        {
            id: 2,
            title: 'title 2',
            body: 'body 2',
            cover: 'img/2.png'
        },
        
        {
            id: 3,
            title: 'title 3',
            body: 'body 3',
            cover: 'img/3.png'
        },

        {
            id: 4,
            title: 'title 4',
            body: 'body 4',
            cover: 'img/4.png'
        }        
    ]
}

describe('<Posts />', () => {

    it('should render posts', () => {
        render(<Posts {...props} />);

        expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(4);
        expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(4);
        expect(screen.getAllByText(/body/i)).toHaveLength(4);
    });

    it('should not render posts', () => {
        render(<Posts />);

        expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const {container} = render(<Posts {...props} />);

        expect(container.firstChild).toMatchSnapshot();
    });

});
