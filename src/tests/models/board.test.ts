import { connect, disconnect, Types } from 'mongoose';
import Board from '../../db/models/Board';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await connect(mongoUri);
});

afterAll(async () => {
  await disconnect();
  await mongoServer.stop();
});

describe('Board Model', () => {
  it('should create and save a board', async () => {
    const boardData = {
      userId: new Types.ObjectId(), 
      title: 'Test Board',
    };

    const board = new Board(boardData);
    const savedBoard = await board.save();

    expect(savedBoard).toHaveProperty('_id');
    expect(savedBoard.title).toBe('Test Board');
    expect(savedBoard.userId).toBeInstanceOf(Types.ObjectId); 
  });

  it('should not create a board without a title', async () => {
    const boardData = {
      userId: new Types.ObjectId(),
    };
  
    const board = new Board(boardData);
  
    await expect(board.save()).rejects.toThrowError('title: Title is required');
  });

  it('should find a board by ID', async () => {
    const boardData = {
      userId: new Types.ObjectId(), 
      title: 'Test Board',
    };

    const board = new Board(boardData);
    const savedBoard = await board.save();

    const foundBoard = await Board.findById(savedBoard._id);
    expect(foundBoard).not.toBeNull();
    expect(foundBoard!.title).toBe('Test Board'); 
  });

  it('should update a board', async () => {
    const boardData = {
      userId: new Types.ObjectId(), 
      title: 'Test Board',
    };

    const board = new Board(boardData);
    const savedBoard = await board.save();

    const updatedBoard = await Board.findByIdAndUpdate(
      savedBoard._id,
      { title: 'Updated Board' },
      { new: true }
    );

    expect(updatedBoard).not.toBeNull();  
    expect(updatedBoard!.title).toBe('Updated Board');  
  });

  it('should delete a board', async () => {
    const boardData = {
      userId: new Types.ObjectId(), 
      title: 'Test Board to Delete',
    };

    const board = new Board(boardData);
    const savedBoard = await board.save();

    await Board.findByIdAndDelete(savedBoard._id);

    const deletedBoard = await Board.findById(savedBoard._id);
    expect(deletedBoard).toBeNull();
  });
});
