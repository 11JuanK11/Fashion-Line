package fashion_line.app.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import fashion_line.app.Entity.UserEntity;

public interface UsersRepository extends MongoRepository<UserEntity, Long>{
    
}
