package com.innowise.contract.tool.service;

import com.innowise.contract.tool.domain.Contract;
import com.innowise.contract.tool.repository.ContractRepository;
import com.innowise.contract.tool.service.dto.ContractDTO;
import com.innowise.contract.tool.service.mapper.ContractMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Contract}.
 */
@Service
@Transactional
public class ContractService {

    private final Logger log = LoggerFactory.getLogger(ContractService.class);

    private final ContractRepository contractRepository;

    private final ContractMapper contractMapper;

    public ContractService(ContractRepository contractRepository, ContractMapper contractMapper) {
        this.contractRepository = contractRepository;
        this.contractMapper = contractMapper;
    }

    /**
     * Save a contract.
     *
     * @param contractDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<ContractDTO> save(ContractDTO contractDTO) {
        log.debug("Request to save Contract : {}", contractDTO);
        return contractRepository.save(contractMapper.toEntity(contractDTO)).map(contractMapper::toDto);
    }

    /**
     * Update a contract.
     *
     * @param contractDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<ContractDTO> update(ContractDTO contractDTO) {
        log.debug("Request to save Contract : {}", contractDTO);
        return contractRepository.save(contractMapper.toEntity(contractDTO)).map(contractMapper::toDto);
    }

    /**
     * Partially update a contract.
     *
     * @param contractDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<ContractDTO> partialUpdate(ContractDTO contractDTO) {
        log.debug("Request to partially update Contract : {}", contractDTO);

        return contractRepository
            .findById(contractDTO.getId())
            .map(existingContract -> {
                contractMapper.partialUpdate(existingContract, contractDTO);

                return existingContract;
            })
            .flatMap(contractRepository::save)
            .map(contractMapper::toDto);
    }

    /**
     * Get all the contracts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Flux<ContractDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contracts");
        return contractRepository.findAllBy(pageable).map(contractMapper::toDto);
    }

    /**
     * Returns the number of contracts available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return contractRepository.count();
    }

    /**
     * Get one contract by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Mono<ContractDTO> findOne(Long id) {
        log.debug("Request to get Contract : {}", id);
        return contractRepository.findById(id).map(contractMapper::toDto);
    }

    /**
     * Delete the contract by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Contract : {}", id);
        return contractRepository.deleteById(id);
    }
}
