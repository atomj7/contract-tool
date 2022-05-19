package com.innowise.contract.tool.service;

import com.innowise.contract.tool.domain.ContractPosition;
import com.innowise.contract.tool.repository.ContractPositionRepository;
import com.innowise.contract.tool.service.dto.ContractPositionDTO;
import com.innowise.contract.tool.service.mapper.ContractPositionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ContractPosition}.
 */
@Service
@Transactional
public class ContractPositionService {

    private final Logger log = LoggerFactory.getLogger(ContractPositionService.class);

    private final ContractPositionRepository contractPositionRepository;

    private final ContractPositionMapper contractPositionMapper;

    public ContractPositionService(ContractPositionRepository contractPositionRepository, ContractPositionMapper contractPositionMapper) {
        this.contractPositionRepository = contractPositionRepository;
        this.contractPositionMapper = contractPositionMapper;
    }

    /**
     * Save a contractPosition.
     *
     * @param contractPositionDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<ContractPositionDTO> save(ContractPositionDTO contractPositionDTO) {
        log.debug("Request to save ContractPosition : {}", contractPositionDTO);
        return contractPositionRepository.save(contractPositionMapper.toEntity(contractPositionDTO)).map(contractPositionMapper::toDto);
    }

    /**
     * Update a contractPosition.
     *
     * @param contractPositionDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<ContractPositionDTO> update(ContractPositionDTO contractPositionDTO) {
        log.debug("Request to save ContractPosition : {}", contractPositionDTO);
        return contractPositionRepository.save(contractPositionMapper.toEntity(contractPositionDTO)).map(contractPositionMapper::toDto);
    }

    /**
     * Partially update a contractPosition.
     *
     * @param contractPositionDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<ContractPositionDTO> partialUpdate(ContractPositionDTO contractPositionDTO) {
        log.debug("Request to partially update ContractPosition : {}", contractPositionDTO);

        return contractPositionRepository
            .findById(contractPositionDTO.getId())
            .map(existingContractPosition -> {
                contractPositionMapper.partialUpdate(existingContractPosition, contractPositionDTO);

                return existingContractPosition;
            })
            .flatMap(contractPositionRepository::save)
            .map(contractPositionMapper::toDto);
    }

    /**
     * Get all the contractPositions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Flux<ContractPositionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ContractPositions");
        return contractPositionRepository.findAllBy(pageable).map(contractPositionMapper::toDto);
    }

    /**
     * Returns the number of contractPositions available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return contractPositionRepository.count();
    }

    /**
     * Get one contractPosition by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Mono<ContractPositionDTO> findOne(Long id) {
        log.debug("Request to get ContractPosition : {}", id);
        return contractPositionRepository.findById(id).map(contractPositionMapper::toDto);
    }

    /**
     * Delete the contractPosition by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete ContractPosition : {}", id);
        return contractPositionRepository.deleteById(id);
    }
}
