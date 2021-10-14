import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import { Home } from './';
import userEvent from '@testing-library/user-event';

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

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nenhum resultado encontrado!');

    expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'title 1 1'  })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2 2'  })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3 3'  })).toBeInTheDocument();

    // Pesquisando no search
    userEvent.type(search, 'title 1');

    expect(screen.getByRole('heading', { name: 'title 1 1'  })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 2 2'  })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3 3'  })).not.toBeInTheDocument();

    // Testando o heading da pesquisa
    expect(screen.getByRole('heading', { name: 'Resultados encontrados para title 1:' }));

    // Limpando pesquisa
    userEvent.clear(search);

    expect(screen.getByRole('heading', { name: 'title 1 1'  })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2 2'  })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3 3'  })).toBeInTheDocument();

    // heading que aparece ao digitar algo inexistente
    userEvent.type(search, 'Post que não existe');

    expect(screen.getByRole('heading', { name: 'Nenhum resultado encontrado!'  })).toBeInTheDocument();
  });

  it('should render search, posts and load more', async () => {
    render(<Home npages={2} />);
    const noMorePosts = screen.getByText('Nenhum resultado encontrado!');

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title 3 3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
