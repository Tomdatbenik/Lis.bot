

import { randomUUID } from 'crypto';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { ChannelAITypes } from '../enums/channelAITypes.enum';
import { ChannelTypes } from '../enums/channelTypes.enum';
import { JobTime } from '../enums/jobTime.enum';

@Entity()
export default class Channel {
    public constructor(id: string) {
        this.id = id
    }

    @PrimaryColumn()
    id: string;

    @Column({ type: 'enum', enum: ChannelTypes, default: ChannelTypes.UNKNOWN })
    type: ChannelTypes;

    @Column({ type: 'enum', enum: ChannelAITypes, default: ChannelAITypes.NONE })
    learn: ChannelAITypes;

    @Column({ type: 'enum', enum: JobTime, default: JobTime.NONE })
    job: JobTime;

    @Column()
    deleted: boolean;

    @CreateDateColumn()
    created?: Date;

    @UpdateDateColumn()
    updated?: Date;
}
