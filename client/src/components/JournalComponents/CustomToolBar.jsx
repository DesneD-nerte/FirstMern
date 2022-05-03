import * as React from 'react';
import { DataGrid,GridFilterModel,GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export default function CustomToolbar(rowsExisting) {
	return (
		<GridToolbarContainer>
		<GridToolbarColumnsButton />
		<GridToolbarFilterButton />
		<GridToolbarDensitySelector />
		{
			rowsExisting &&
			<GridToolbarExport csvOptions={{ disableToolbarButton: true }} />
		}
		</GridToolbarContainer>
	);
}