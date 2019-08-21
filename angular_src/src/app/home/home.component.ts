import { Component, OnInit, ViewChild } from '@angular/core';
import { CookModel } from 'src/models/cook.model';
import { CookSearchService } from '../cook/services/cook-search.service';
import { delay } from 'rxjs/operators';
import { SearchQueryService } from '../shared/services/search-query.service';


@Component({

    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('searchByName') SearchByName;
    private _searchQuery: string;
    private _locationEntered: string = 'default';
    private _price: Number = 0;
    public icons = ['add', 'star'];



    filteredCooks: CookModel[] = [];
    cooks: CookModel[] = [];
    filter: string;
    priceFilter: string;
    priceFilterLength: number;
    priceFilterNumber: number;
    errorMessage: string;
    locations: string[] = ["Hyderabad", 'Bangalore', "Chennai", 'Kochi', "Tirupati", "Calicut"];
    prices: Number[] = [3000, 4000, 5000, 10000];


    constructor(private search: CookSearchService,
        private searchQueryService: SearchQueryService) {

        this.searchQueryService.searchQuery$.subscribe(query => this.searchQuery = query);
    }
    public get searchQuery(): string {
        return this._searchQuery;
    }
    public set searchQuery(value: string) {
        this._searchQuery = value;
        console.log(this._searchQuery);
        /* if((this._price === 0) && (this._locationEntered ==='default')){
            this.filteredCooks = this.cooks;
        } */
        this.filteredCooks = (this._searchQuery) ? this.performFilter(this._searchQuery) : this.cooks;

        console.log(this.cooks);

    }

    public get locationEntered(): string {
        return this._locationEntered;
    }
    public set locationEntered(value: string) {
        this._locationEntered = value;

    }


    public get price(): Number {
        return this._price;
    }
    public set price(value: Number) {
        this._price = value;
    }


    ngOnInit(): void {


        this.search.searchByName().subscribe(
            cook => {
                this.cooks = cook;
                this.filteredCooks = cook;
            },
            err => this.errorMessage = <any>err);


    }

    locationOrPriceEntered() {

        this.priceFilter = this._price.toString();
        this.priceFilterLength = this.priceFilter.length;
        this.priceFilterNumber = Number(this.priceFilter.slice(2, this.priceFilterLength));
        if ((this._price == 0) && (this._locationEntered !== 'default')) {
            console.log(this._locationEntered);
            this.search.searchByLocation(this._locationEntered).subscribe(
                cook => {//this.cooks = cook;
                    this.filteredCooks = cook
                },
                err => this.errorMessage = <any>err)
            console.log("after search by only location ");
            console.log(this.filteredCooks);
        }


        else if (((this._price != 0) && (this._locationEntered === 'default'))) {
            this.search.searchByPrice(this.priceFilterNumber).subscribe(
                cook => {//this.cooks = cook;
                    this.filteredCooks = cook;
                },
                err => this.errorMessage = <any>err);
        }

        else if (((this._price != 0) && (this._locationEntered !== 'default'))) {
            this.search.searchByPriceAndLocation(this.priceFilterNumber, this.locationEntered).subscribe(
                cook => {//this.cooks = cook;
                    this.filteredCooks = cook;
                },
                err => this.errorMessage = <any>err);
        }
        else if ((this._price == 0) && (this._locationEntered === 'default')) {
            this.filteredCooks = this.cooks;
            console.log(this.filteredCooks);

        }

    }



    performFilter(_searchQuery: string): CookModel[] {

        this.filter = _searchQuery.toLocaleLowerCase();

        return this.filteredCooks = this.filteredCooks.filter((cook: CookModel) => cook.cookFirstName.toLocaleLowerCase().indexOf(this.filter) !== -1);

    }
    ngOnDestroy() {
        console.log(this.searchQuery);
        this.searchQueryService.addSearchQuery(undefined);
        console.log(this.searchQuery);


    }


}