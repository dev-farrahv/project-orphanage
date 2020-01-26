import { Component, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

declare var require: any;

const data: any = require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
	function: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', function: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', function: 'H'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', function: 'H'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', function: 'H'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B', function: 'H'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', function: 'H'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', function: 'H'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', function: 'H'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', function: 'H'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', function: 'H'},
  ];
  


  export interface TaskListElement {
	name: string;
	position: number;
  }
  
  const TASKELEMENT_DATA: TaskListElement[] = [
	{position: 1, name: 'This is a task test.', },
	{position: 2, name: 'Ready all the medicines', },
	{position: 3, name: 'Lithium', },
	{position: 4, name: 'Beryllium', },
	{position: 5, name: 'Boron', },
  ];
    

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements AfterViewInit {
	ngAfterViewInit() {}

	// Barchart
	barChart1: Chart = {
		type: 'Bar',
		data: data['Bar'],
		options: {
			seriesBarDistance: 15,
			high: 12,

			axisX: {
				showGrid: false,
				offset: 20
			},
			axisY: {
				showGrid: true,
				offset: 40
			},
			height: 360
		},

		responsiveOptions: [
			[
				'screen and (min-width: 640px)',
				{
					axisX: {
						labelInterpolationFnc: function(
							value: number,
							index: number
						): string {
							return index % 1 === 0 ? `${value}` : null;
						}
					}
				}
			]
		]
	};

	// This is for the donute chart
	donuteChart1: Chart = {
		type: 'Pie',
		data: data['Pie'],
		options: {
			donut: true,
			height: 260,
			showLabel: false,
			donutWidth: 20
		}
	};


	displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol','function'];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	selection = new SelectionModel<PeriodicElement>(true, []);

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
  
	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
	  const numSelected = this.selection.selected.length;
	  const numRows = this.dataSource.data.length;
	  return numSelected === numRows;
	}
  
	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
	  this.isAllSelected() ?
		  this.selection.clear() :
		  this.dataSource.data.forEach(row => this.selection.select(row));
	}
  
	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: PeriodicElement): string {
	  if (!row) {
		return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	  }
	  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}


	//TASK LIST TABLE =======================================
	taskdisplayedColumns: string[] = ['select', 'position', 'name'];
	taskdataSource = new MatTableDataSource<TaskListElement>(TASKELEMENT_DATA);
	taskselection = new SelectionModel<TaskListElement>(true, []);

	taskapplyFilter(filterValue: string) {
		this.taskdataSource.filter = filterValue.trim().toLowerCase();
	}
  
	/** Whether the number of selected elements matches the total number of rows. */
	taskisAllSelected() {
	  const numSelected = this.taskselection.selected.length;
	  const numRows = this.taskdataSource.data.length;
	  return numSelected === numRows;
	}
  
	/** Selects all rows if they are not all selected; otherwise clear taskselection. */
	taskmasterToggle() {
	  this.isAllSelected() ?
		  this.taskselection.clear() :
		  this.taskdataSource.data.forEach(row => this.taskselection.select(row));
	}
  
	/** The label for the checkbox on the passed row */
	taskcheckboxLabel(row?: TaskListElement): string {
	  if (!row) {
		return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	  }
	  return `${this.taskselection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}
}
