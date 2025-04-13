import { connect, disconnect } from 'mongoose';
import Column from '../../db/models/Column';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Types } from 'mongoose';

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

describe('Column Model', () => {
  it('should create and save a column', async () => {
    const columnData = {
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(), 
      title: 'Test Column',
    };

    const column = new Column(columnData);
    const savedColumn = await column.save();

    expect(savedColumn).toHaveProperty('_id');
    expect(savedColumn.title).toBe('Test Column');
    expect(savedColumn.boardId).toBeInstanceOf(Types.ObjectId);
    expect(savedColumn.userId).toBeInstanceOf(Types.ObjectId); 
  });

  it('should not create a column without a title', async () => {
    const columnData = {
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(), 
    };

    const column = new Column(columnData);

    await expect(column.save()).rejects.toThrowError('Title must exists');
  });

  it('should find a column by ID', async () => {
    const columnData = {
      boardId: new Types.ObjectId(), 
      userId: new Types.ObjectId(),
      title: 'Test Column',
    };

    const column = new Column(columnData);
    const savedColumn = await column.save();

    const foundColumn = await Column.findById(savedColumn._id);

    expect(foundColumn).not.toBeNull(); 
    expect(foundColumn!.title).toBe('Test Column');  
  });

  it('should update a column', async () => {
    const columnData = {
      boardId: new Types.ObjectId(), 
      userId: new Types.ObjectId(), 
      title: 'Test Column',
    };

    const column = new Column(columnData);
    const savedColumn = await column.save();

    const updatedColumn = await Column.findByIdAndUpdate(
      savedColumn._id,
      { title: 'Updated Column' },
      { new: true }
    );

    expect(updatedColumn).not.toBeNull(); 
    expect(updatedColumn!.title).toBe('Updated Column');  
  });

  it('should delete a column', async () => {
    const columnData = {
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(),
      title: 'Test Column to Delete',
    };

    const column = new Column(columnData);
    const savedColumn = await column.save();

    await Column.findByIdAndDelete(savedColumn._id);

    const deletedColumn = await Column.findById(savedColumn._id);
    expect(deletedColumn).toBeNull();
  });
});
