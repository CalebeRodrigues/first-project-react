import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import { Home } from './';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          "userId": 1,
          "id": 1,
          "title": "title 1",
          "body": "body 1",
          url: 'img1.jpg',
        },
        {
          "userId": 2,
          "id": 2,
          "title": "title 2",
          "body": "body 2",
          url: 'img2.jpg',
        },
        {
          "userId": 3,
          "id": 3,
          "title": "title 3",
          "body": "body 3",
          url: 'img3.jpg',
        },
    ]))
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nenhum resultado encontrado!');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    const imgs = screen.getAllByRole('img', { name: /title/i });
    const button = screen.getByRole('button', { name: /load more/i });

    expect(search).toBeInTheDocument();
    expect(imgs).toHaveLength(3);
    expect(button).toBeInTheDocument();
  });
});
