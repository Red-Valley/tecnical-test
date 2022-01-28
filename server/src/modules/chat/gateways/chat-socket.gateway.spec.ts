import { Test, TestingModule } from '@nestjs/testing';
import { ChatSocketGateway } from './chat-socket.gateway';

describe('ChatSocketGateway', () => {
  let gateway: ChatSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSocketGateway],
    }).compile();

    gateway = module.get<ChatSocketGateway>(ChatSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
