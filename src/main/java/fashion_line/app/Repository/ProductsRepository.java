package fashion_line.app.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import fashion_line.app.Entity.Product;

public interface ProductsRepository extends MongoRepository<Product, Long>{
    Optional<List<Product>> findByName(String name);
    Optional<List<Product>> findByCategory(String category);
    
}
