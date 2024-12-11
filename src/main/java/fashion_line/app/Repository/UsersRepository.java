package fashion_line.app.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import fashion_line.app.Entity.UserEntity;


@Repository
public interface UsersRepository extends MongoRepository<UserEntity, Long>{
    UserEntity findByUsername(String string);
}
