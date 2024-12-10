package fashion_line.app.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import fashion_line.app.Entity.Product;

public interface ProductsRepository extends MongoRepository<Product, Long>{
    
}
